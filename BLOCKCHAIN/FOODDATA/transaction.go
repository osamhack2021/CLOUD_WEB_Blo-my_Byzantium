package FOODDATA

import (
	"BLOCKCHAIN/UTILS"
	"errors"
	"time"
)

type mempool struct {
	Txs []*Tx
}

var Mempool *mempool = &mempool{}

//부식 Tx
type Tx struct {
	ID        string
	Timestamp time.Time
	TxIns     []*TxIn
	TxOuts    []*TxOut
}

type TxIn struct {
	TxID       string
	Index      int
	Owner      string
	Food       string
	AmountUnit string
}

type TxOut struct {
	Owner      string
	Food       string
	Amount     int
	AmountUnit string
}

type UTxOut struct {
	TxID   string
	Index  int
	Amount int
}

func isOnMempool(uTxOut *UTxOut) bool {
	for _, tx := range Mempool.Txs {
		for _, input := range tx.TxIns {
			if input.TxID == uTxOut.TxID && input.Index == uTxOut.Index {
				return true
			}
		}
	}
	return false
}

func (t *Tx) getId() {
	t.ID = UTILS.GetHash(t)
}

func maketotalamountTx(to, food, unit string, amount int) *Tx {
	txIns := []*TxIn{
		{"", -1, "TOTAL AMOUNT", food, unit},
	}
	txOuts := []*TxOut{
		{to, food, amount, unit},
	}
	tx := Tx{
		ID:        "",
		Timestamp: time.Now(),
		TxIns:     txIns,
		TxOuts:    txOuts,
	}
	tx.getId()
	return &tx
}

func makeTx(from, to, food, unit string, amount int) (*Tx, error) {
	if Remained(GetBlockchain(), from, food) < amount {
		return nil, errors.New("not enough remained")
	}
	var txOuts []*TxOut
	var txIns []*TxIn
	total := 0
	UTxOuts := UTxOutsByAddress(GetBlockchain(), from, food)
	for _, uTxOut := range UTxOuts {
		if total >= amount {
			break
		}
		txIn := &TxIn{uTxOut.TxID, uTxOut.Index, from, food, unit}
		txIns = append(txIns, txIn)
		total += uTxOut.Amount
	}
	if change := total - amount; change != 0 {
		changeTxOut := &TxOut{from, food, change, unit}
		txOuts = append(txOuts, changeTxOut)
	}
	txOut := &TxOut{to, food, amount, unit}
	txOuts = append(txOuts, txOut)
	tx := &Tx{
		ID:        "",
		Timestamp: time.Now(),
		TxIns:     txIns,
		TxOuts:    txOuts,
	}
	tx.getId()
	return tx, nil
}

func (m *mempool) AddTx(from, to, food, unit string, amount int) error {
	tx, err := makeTx(from, to, food, unit, amount)
	if err != nil {
		return err
	}
	m.Txs = append(m.Txs, tx)
	return nil
}

func (m *mempool) ProvideFood(address, food, unit string, amount int) error {
	tx := maketotalamountTx(address, food, unit, amount)
	m.Txs = append(m.Txs, tx)
	return nil
}

func (m *mempool) TxToConfirm() []*Tx {
	txs := m.Txs
	m.Txs = nil
	return txs
}
