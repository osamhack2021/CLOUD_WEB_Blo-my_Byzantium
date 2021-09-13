package API

import (
	"BLOCKCHAIN/FOODDATA"
	"BLOCKCHAIN/UTILS"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"strconv"

	"github.com/gorilla/mux"
)

type URL string

var port string = ":8080"

type URLDescription struct {
	URL         URL
	Method      string
	Description string
	Payload     string
}

type AddBlockBody struct {
	Message string
}

func documentation(rw http.ResponseWriter, r *http.Request) {
	data := []URLDescription{
		{
			URL:         "http://localhost:8080/fooddata/",
			Method:      "GET",
			Description: "See Documentation",
		},
		{
			URL:         "http://localhost:8080/fooddata/blocks",
			Method:      "GET",
			Description: "See All Blocks",
		},
		{
			URL:         "http://localhost:8080/fooddata/blocks",
			Method:      "POST",
			Description: "Add A Block",
			Payload:     "data:string",
		},
		{
			URL:         "http://localhost:8080/fooddata/blocks/{hash}",
			Method:      "GET",
			Description: "See A Block",
		},
		{
			URL:         "http://localhost:8080/fooddata/transactions/delivery/{from}?{to}?{food}?{unit}?{amount}",
			Method:      "POST",
			Description: "Make a Tx",
		},
		{
			URL:         "http://localhost:8080/fooddata/transactions/provide/{address}?{food}?{unit}?{amount}",
			Method:      "POST",
			Description: "Make a remained",
		},
		{
			URL:         "http://localhost:8080/fooddata/transactions/mempool",
			Method:      "GET",
			Description: "See Now Mempool",
		},
		{
			URL:         "http://localhost:8080/fooddata/transactions/balance/{address}/{food}",
			Method:      "GET",
			Description: "See address's balance",
		},
	}
	json.NewEncoder(rw).Encode(data)
}

func blocks(rw http.ResponseWriter, r *http.Request) {
	switch r.Method {
	case "GET":
		UTILS.HandleErr(json.NewEncoder(rw).Encode(FOODDATA.GetBlockchain()))
	case "POST":
		FOODDATA.GetBlockchain().AddBlock()
		rw.WriteHeader(http.StatusCreated)
	}
}

func jsonContentTypeMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(rw http.ResponseWriter, r *http.Request) {
		rw.Header().Add("Content-Type", "application/json")
		next.ServeHTTP(rw, r)
	})
}

func block(rw http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	hash := vars["hash"]
	block, err := FOODDATA.FindBlock(FOODDATA.GetBlockchain(), hash)
	UTILS.HandleErr(err)
	json.NewEncoder(rw).Encode(block)
}

func transactionDelivery(rw http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	from := vars["from"]
	to := vars["to"]
	food := vars["food"]
	unit := vars["unit"]
	amount, err := strconv.Atoi(vars["amount"])
	UTILS.HandleErr(err)
	FOODDATA.Mempool.AddTx(from, to, food, unit, amount)
	rw.WriteHeader(http.StatusCreated)
}

func transactionProvide(rw http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	address := vars["address"]
	food := vars["food"]
	unit := vars["unit"]
	amount, err := strconv.Atoi(vars["amount"])
	UTILS.HandleErr(err)
	FOODDATA.Mempool.ProvideFood(address, food, unit, amount)
	rw.WriteHeader(http.StatusCreated)
}

func mempool(rw http.ResponseWriter, r *http.Request) {
	m := FOODDATA.Mempool
	json.NewEncoder(rw).Encode(m)
}

type balancest struct {
	Address string
	Food    string
	Amount  int
}

func balance(rw http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	address := vars["address"]
	food := vars["food"]
	amount := FOODDATA.BalanceByAddress(FOODDATA.GetBlockchain(), address, food)
	json.NewEncoder(rw).Encode(balancest{address, food, amount})
}

func Start() {
	handler := mux.NewRouter()
	handler.Use(jsonContentTypeMiddleware)

	handler.HandleFunc("/fooddata/", documentation)
	handler.HandleFunc("/fooddata/blocks", blocks)
	handler.HandleFunc("/fooddata/blocks/{hash:[a-z0-9]+}", block)
	handler.HandleFunc("/fooddata/transactions/delivery/{from}/{to}/{food}/{unit}/{amount}", transactionDelivery)
	handler.HandleFunc("/fooddata/transactions/provide/{address}/{food}/{unit}/{amount}", transactionProvide)
	handler.HandleFunc("/fooddata/transactions/mempool", mempool)
	handler.HandleFunc("/fooddata/transactions/balance/{address}/{food}", balance)

	fmt.Println("Listening on http://localhost:8080")
	log.Fatal(http.ListenAndServe(port, handler))
}
