package FIREARMASSETS

import (
	"BLOCKCHAIN/UTILS"
	"time"
)

type mempool struct {
	Txs []*Tx
}

var Mempool *mempool = &mempool{}

//총기 Tx
type Tx struct {
	ID        string
	Timestamp time.Time
	TxIns     []*TxIn
	TxOuts    []*TxOut
}

type TxIn struct {
	TxID         string
	Index        int
	SerialNumber int
	Owner        string
	Model        string
	OwnP         string
	OwnCo        string
	OwnBn        string
	OwnDiv       string
}
type TxOut struct {
	SerialNumber int
	Owner        string
	Model        string
	OwnP         string
	OwnCo        string
	OwnBn        string
	OwnDiv       string
	Notes        string
}

type UTxOut struct {
	TxID   string
	Index  int
	Owner  string
	Model  string
	OwnP   string
	OwnCo  string
	OwnBn  string
	OwnDiv string
	Notes  string
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

func makeFireArmTx(model, notes string, serialNum int) *Tx {
	txIns := []*TxIn{
		{"", -1, serialNum, "Maker", model, "", "", "", ""},
	}
	txOuts := []*TxOut{
		{serialNum, "Maker", model, "", "", "", "", notes},
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

func makeTx(uTx *UTxOut, owner, model, ownP, ownCo, ownBn, ownDiv, notes string, serialNum int) (*Tx, error) {

	var txOuts []*TxOut
	var txIns []*TxIn
	txIn := &TxIn{uTx.TxID, uTx.Index, serialNum, uTx.Owner, uTx.Model, uTx.OwnP, uTx.OwnCo, uTx.OwnBn, uTx.OwnDiv}
	txIns = append(txIns, txIn)
	txOut := &TxOut{serialNum, owner, model, ownP, ownCo, ownBn, ownDiv, notes}
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

func (m *mempool) AddTx(uTx *UTxOut, owner, model, ownP, ownCo, ownBn, ownDiv, notes string, serialNum int) error {
	tx, err := makeTx(uTx, owner, model, ownP, ownCo, ownBn, ownDiv, notes, serialNum)
	if err != nil {
		return err
	}
	m.Txs = append(m.Txs, tx)
	return nil
}

func (m *mempool) Makefirearm(model, notes string, serialNum int) error {
	tx := makeFireArmTx(model, notes, serialNum)
	m.Txs = append(m.Txs, tx)
	return nil
}

func (m *mempool) TxToConfirm() []*Tx {
	txs := m.Txs
	m.Txs = nil
	return txs
}
