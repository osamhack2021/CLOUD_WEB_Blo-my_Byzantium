package FOODDATA

import (
	"BLOCKCHAIN/UTILS"
	"fmt"
	"time"
)

type Block struct {
	Hash         string
	PrevHash     string
	Timestamp    int
	Transactions []*Tx
}

func calculateHash(b *Block) string {
	temp := fmt.Sprint(b.Transactions) + fmt.Sprint(b.Timestamp) + b.PrevHash
	hash := UTILS.GetHash(temp)
	return hash
}

func createBlock(prevHash string) *Block {
	block := &Block{
		Hash:     "",
		PrevHash: prevHash,
	}
	block.Timestamp = int(time.Now().Unix())
	block.Hash = calculateHash(block)
	block.Transactions = Mempool.TxToConfirm()
	return block
}
