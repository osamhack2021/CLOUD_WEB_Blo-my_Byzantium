package SERVICE

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

var port string = ":8080"

type URLDescription struct {
	URL         string `json:"url"`
	Method      string `json:"method"`
	Description string `json:"description"`
	Payload     string `json:"payload"`
}

func help(rw http.ResponseWriter, r *http.Request) {
	data := []URLDescription{
		{
			URL:         "http://localhost:8080/fooddata",
			Method:      "GET",
			Description: "See All URL",
		},
		{
			URL:         "http://localhost:8080/fooddata/{yyyy-MM-dd}/{food}",
			Method:      "GET",
			Description: "See The {food} Data For That day",
			Payload:     "{yyyy-MM-dd} = format\n{food}=string\n  (ex. http://localhost:8080/fooddata/2021-09-21/Kimchi)",
		},
		{
			URL:         "http://localhost:8080/fooddata/{yyyy-MM-dd}/{food}/{from}/{to}/{amount}",
			Method:      "POST",
			Description: "Make The {food} Data For That day",
			Payload:     "{yyyy-MM-dd} = format\n{food}=string\n{from}=string\n{to}=string\namount=int\n  (ex. http://localhost:8080/fooddata/2021-09-21/Kimchi/1stBrigade/1stGeneration/280)",
		},
		{
			URL:         "http://localhost:8080/fooddata/admin/Provide/{address}/{food}/{amount}",
			Method:      "POST",
			Description: "Make The Total Amount Data For That Day",
			Payload:     "{address} = string\n{food}=string\n{amount}=int\n  (ex.http://localhost:8080/fooddata/admin/Provide/1stBrigade/Kimchi/750)",
		},
		{
			URL:         "http://localhost:8080/fooddata/admin/mempool",
			Method:      "GET",
			Description: "See Mempool",
		},
		{
			URL:         "http://localhost:8080/fooddata/admin/approve",
			Method:      "POST",
			Description: "Make A Block Data",
		},
	}
	json.NewEncoder(rw).Encode(data)
}

func approve(rw http.ResponseWriter, r *http.Request) {
	switch r.Method {
	case "GET":
		UTILS.HandleErr(json.NewEncoder(rw).Encode(FOODDATA.AllBlocks(FOODDATA.GetBlockchain())))
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

func makefooddate(rw http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	from := vars["from"]
	to := vars["to"]
	food := vars["food"]
	amount, err := strconv.Atoi(vars["amount"])
	UTILS.HandleErr(err)
	fmt.Println(from, to, food, amount)
	FOODDATA.Mempool.AddTx(from, to, food, amount)
	rw.WriteHeader(http.StatusCreated)
}

func provide(rw http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	address := vars["address"]
	food := vars["food"]
	amount, err := strconv.Atoi(vars["amount"])
	UTILS.HandleErr(err)
	FOODDATA.Mempool.ProvideFood(address, food, amount)
	rw.WriteHeader(http.StatusCreated)
}

func mempool(rw http.ResponseWriter, r *http.Request) {
	m := FOODDATA.Mempool
	json.NewEncoder(rw).Encode(m)
}

func seefooddate(rw http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	date := vars["date"]
	food := vars["food"]
	UTILS.HandleErr(json.NewEncoder(rw).Encode(FOODDATA.GetFoodblockBydateNfood(date, food)))

}

func Start() {
	handler := mux.NewRouter()
	handler.Use(jsonContentTypeMiddleware)

	handler.HandleFunc("/fooddata", help)
	handler.HandleFunc("/fooddata/{date}/{food}", seefooddate)
	handler.HandleFunc("/fooddata/{food}/{from}/{to}/{amount}", makefooddate)
	handler.HandleFunc("/fooddata/admin/mempool", mempool)
	handler.HandleFunc("/fooddata/admin/Provide/{address}/{food}/{amount}", provide)
	handler.HandleFunc("/fooddata/admin/approve", approve)

	fmt.Println("Listening on http://localhost:8080")
	log.Fatal(http.ListenAndServe(port, handler))
}
