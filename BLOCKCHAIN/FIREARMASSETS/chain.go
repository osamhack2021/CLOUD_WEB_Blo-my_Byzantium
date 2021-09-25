package FIREARMASSETS

import (
	"errors"
	"fmt"
	"sync"
)

type blockchain struct {
	NewestHash string
}

type DB struct {
	Blocks []*Block
}

var db DB
var b *blockchain
var once sync.Once

var errblockNotExist error = errors.New("Block not found")

func findBlockinDB(db DB, hash string) (*Block, error) {
	for _, block := range db.Blocks {
		if block.Hash == hash {
			return block, nil
		}
	}
	return &Block{}, errblockNotExist
}

func FindBlock(b *blockchain, hash string) (block *Block, err error) {
	here := b.NewestHash
	for {
		if here == "" {
			return &Block{}, errblockNotExist
		}
		if here == hash {
			return findBlockinDB(db, here)
		}
		bb, _ := findBlockinDB(db, here)
		here = bb.PrevHash
	}
}

func (b *blockchain) AddBlock() {
	block := createBlock(b.NewestHash)
	db.Blocks = append(db.Blocks, block)
	b.NewestHash = block.Hash
}

func UTxOutsBySriealnum(b *blockchain, serialnum int) []*UTxOut {
	var uTxOuts []*UTxOut
	creatorTxs := make(map[string]bool)

	for _, block := range AllBlocks(b) {
		for _, tx := range block.Transactions {
			for _, input := range tx.TxIns {
				if input.SerialNumber == serialnum {
					creatorTxs[input.TxID] = true
				}
			}
			for i, output := range tx.TxOuts {
				if output.SerialNumber == serialnum {
					if _, ok := creatorTxs[tx.ID]; !ok {
						uTxOut := &UTxOut{tx.ID, i, output.Owner, output.Model, output.OwnP, output.OwnCo, output.OwnBn, output.OwnDiv, output.Notes}
						if !isOnMempool(uTxOut) {
							uTxOuts = append(uTxOuts, uTxOut)
						}
					}
				}
			}
		}
	}
	return uTxOuts
}

var errNotExist = errors.New("there is no firearm corresponding to the serial number")

func NewestInfo(b *blockchain, serialnum int) (*UTxOut, error) {
	txOuts := UTxOutsBySriealnum(b, serialnum)
	if len(txOuts) == 0 || txOuts[0].Notes == "discard" {
		return nil, errNotExist
	}
	return txOuts[0], nil
}

func AllBlocks(b *blockchain) (blocks []*Block) {
	here := b.NewestHash
	for {
		block, _ := findBlockinDB(db, here)
		blocks = append(blocks, block)
		here = block.PrevHash
		if block.PrevHash == "" {
			break
		}
	}
	return blocks
}

func GetBlockchain() *blockchain {
	if b == nil {
		once.Do(func() {
			b = &blockchain{}
			b.AddBlock()
		})
	}
	return b
}

type FireArmAssets struct {
	SerialNum int    `json:"serialNum"`
	Owner     string `json:"owner"`
	Model     string `json:"model"`
	OwnP      string `json:"ownP,omitempty"`
	OwnCo     string `json:"ownCo,omitempty"`
	OwnBn     string `json:"ownBn,omitempty"`
	OwnDiv    string `json:"ownDiv,omitempty"`
	Notes     string `json:"notes,omitempty"`
	Update    string `json:"update"`
}

func GetFirArmAssetsBySerialnum(serialNum int) (fbs []*FireArmAssets) {
	blockchian := GetBlockchain()
	blocks := AllBlocks(blockchian)
	for _, block := range blocks {
		for _, Tx := range block.Transactions {
			for _, TxIn := range Tx.TxOuts {
				if TxIn.SerialNumber == serialNum {
					fb := FireArmAssets{
						serialNum,
						Tx.TxOuts[0].Owner,
						Tx.TxOuts[0].Model,
						Tx.TxOuts[0].OwnP,
						Tx.TxOuts[0].OwnCo,
						Tx.TxOuts[0].OwnBn,
						Tx.TxOuts[0].OwnDiv,
						Tx.TxOuts[0].Notes,
						fmt.Sprint(Tx.Timestamp),
					}
					fbs = append(fbs, &fb)
				}
			}
		}
	}
	return fbs
}
