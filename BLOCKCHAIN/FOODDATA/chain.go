package FOODDATA

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

func UTxOutsByAddress(b *blockchain, address, food string) []*UTxOut {
	var uTxOuts []*UTxOut
	creatorTxs := make(map[string]bool)

	for _, block := range AllBlocks(b) {
		for _, tx := range block.Transactions {
			for _, input := range tx.TxIns {
				if input.Owner == address && input.Food == food {
					creatorTxs[input.TxID] = true
				}
			}
			for i, output := range tx.TxOuts {
				if output.Owner == address && output.Food == food {
					if _, ok := creatorTxs[tx.ID]; !ok {
						uTxOut := &UTxOut{tx.ID, i, output.Amount}
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

func Remained(b *blockchain, address, food string) int {
	txOuts := UTxOutsByAddress(b, address, food)
	fmt.Println(txOuts)
	var amount int
	for _, txOut := range txOuts {
		amount += txOut.Amount
	}
	fmt.Println(amount)
	return amount
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

func BalanceByAddress(b *blockchain, address, food string) int {
	txOuts := UTxOutsByAddress(b, address, food)
	for _, tx := range txOuts {
		fmt.Println(*tx)
	}
	var amount int
	amount = 0
	for _, txOut := range txOuts {
		amount += txOut.Amount
	}
	return amount
}
