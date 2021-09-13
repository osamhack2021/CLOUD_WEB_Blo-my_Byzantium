package FOODDATA

import (
	"errors"
	"fmt"
	"sync"
)

type blockchain struct {
	NewestHash string
	Blocks     []*Block
}

var b *blockchain
var once sync.Once

var errblockNotExist error = errors.New("Block not found")

func FindBlock(b *blockchain, hash string) (*Block, error) {
	for _, block := range b.Blocks {
		if block.Hash == hash {
			return block, nil
		}
	}
	return &Block{}, errblockNotExist
}

func (b *blockchain) AddBlock() {
	block := createBlock(b.NewestHash)
	b.Blocks = append(b.Blocks, block)
	b.NewestHash = block.Hash
}

func UTxOutsByAddress(b *blockchain, address, food string) []*UTxOut {
	var uTxOuts []*UTxOut
	creatorTxs := make(map[string]bool)

	for _, block := range b.Blocks {
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
	var amount int
	amount = 0
	for _, txOut := range txOuts {
		amount += txOut.Amount
	}
	return amount
}
