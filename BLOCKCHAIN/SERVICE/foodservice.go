package SERVICE

import (
	"BLOCKCHAIN/FOODDATA"
	"BLOCKCHAIN/UTILS"
	"encoding/json"
	"net/http"
	"strconv"

	"github.com/gorilla/mux"
)

func foodhelp(rw http.ResponseWriter, r *http.Request) {
	data := []URLDescription{
		{
			URL:         "http://localhost:8080/fooddata",
			Method:      "GET",
			Description: "See All URL",
		},
		{
			URL:         "http://localhost:8080/fooddata/see/{yyyy-MM-dd}/{food}",
			Method:      "GET",
			Description: "See The {food} Data For That day",
			Payload:     "{yyyy-MM-dd} = formated String {food}=string",
			Example:     "http://localhost:8080/fooddata/2021-09-21/Kimchi",
		},
		{
			URL:         "http://localhost:8080/fooddata/makefooddata/{food}/{from}/{to}/{amount}",
			Method:      "POST",
			Description: "Make The {food} Data For That day",
			Payload:     "{food}=string {from}=string {to}=string {amount}=int",
			Example:     "http://localhost:8080/fooddata/2021-09-21/Kimchi/1stBrigade/1stGeneration/280",
		},
		{
			URL:         "http://localhost:8080/fooddata/admin/Provide/{address}/{food}/{amount}",
			Method:      "POST",
			Description: "Make The Total Amount Data For That Day",
			Payload:     "{address} = string {food}=string {amount}=int",
			Example:     "http://localhost:8080/fooddata/admin/Provide/1stBrigade/Kimchi/750",
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

func approvefooddata(rw http.ResponseWriter, r *http.Request) {
		FOODDATA.GetBlockchain().AddBlock()
		rw.WriteHeader(http.StatusCreated)
}

func makefooddate(rw http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	from := vars["from"]
	to := vars["to"]
	food := vars["food"]
	amount, err := strconv.Atoi(vars["amount"])
	UTILS.HandleErr(err)
	FOODDATA.Mempool.AddTx(from, to, food, amount)
	rw.WriteHeader(http.StatusCreated)
}

func providefooddate(rw http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	address := vars["address"]
	food := vars["food"]
	amount, err := strconv.Atoi(vars["amount"])
	UTILS.HandleErr(err)
	FOODDATA.Mempool.ProvideFood(address, food, amount)
	rw.WriteHeader(http.StatusCreated)
}

func foodmempool(rw http.ResponseWriter, r *http.Request) {
	m := FOODDATA.Mempool
	json.NewEncoder(rw).Encode(m)
}

func seefooddate(rw http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	date := vars["date"]
	food := vars["food"]
	UTILS.HandleErr(json.NewEncoder(rw).Encode(FOODDATA.GetFoodblockBydateNfood(date, food)))

}

func foodStart(handler *mux.Router) {

	handler.HandleFunc("/fooddata", foodhelp)

	handler.HandleFunc("/fooddata/see/{date}/{food}", seefooddate)
	handler.HandleFunc("/fooddata/makefooddata/{food}/{from}/{to}/{amount}", makefooddate)

	handler.HandleFunc("/fooddata/admin/approve", approvefooddata)
	handler.HandleFunc("/fooddata/admin/provide/{address}/{food}/{amount}", providefooddate)
	handler.HandleFunc("/fooddata/admin/mempool", foodmempool)
}
