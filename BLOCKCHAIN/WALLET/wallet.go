package WALLET

import (
	"BLOCKCHAIN/UTILS"
	"crypto/ecdsa"
	"crypto/elliptic"
	"crypto/rand"
	"crypto/x509"
	"encoding/hex"
	"fmt"
	"math/big"
)

func makeKey() *ecdsa.PrivateKey {
	privateKey, err := ecdsa.GenerateKey(elliptic.P256(), rand.Reader)
	UTILS.HandleErr(err)
	return privateKey
}

func EncryptKey(priv *ecdsa.PrivateKey) string {
	keyAsBytes, err := x509.MarshalECPrivateKey(priv)
	UTILS.HandleErr(err)
	return string(keyAsBytes)

}

func MakeSignature(priv *ecdsa.PrivateKey, message string) []byte {

	hasedMessage := HashMessage(message)

	hashAsBytes := ByteHash(hasedMessage)

	r, s, err := ecdsa.Sign(rand.Reader, priv, hashAsBytes)
	UTILS.HandleErr(err)

	signature := append(r.Bytes(), s.Bytes()...)

	fmt.Printf("\n%x", signature)

	return signature

}

func HashMessage(message string) string {
	hasedMessage := UTILS.GetHash(message)
	return hasedMessage
}

func ByteHash(hased string) []byte {
	hashAsBytes, err := hex.DecodeString(hased)
	UTILS.HandleErr(err)
	return hashAsBytes
}

func restoreKey(privatekey string) *ecdsa.PrivateKey {

	privByte, err := hex.DecodeString(privatekey)
	UTILS.HandleErr(err)

	restoredKey, err := x509.ParseECPrivateKey(privByte)
	UTILS.HandleErr(err)

	return restoredKey
}

func restoreSignature(signature string) (*big.Int, *big.Int) {
	sigBytes, err := hex.DecodeString(signature)
	UTILS.HandleErr(err)
	rBytes := sigBytes[:len(sigBytes)/2]
	sBytes := sigBytes[len(sigBytes)/2:]

	var bigR, bigS = big.Int{}, big.Int{}

	bigR.SetBytes(rBytes)
	bigS.SetBytes(sBytes)
	return &bigR, &bigS
}

func Test() {

}
