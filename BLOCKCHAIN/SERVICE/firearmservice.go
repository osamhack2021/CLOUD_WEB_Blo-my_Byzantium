package SERVICE

import (
	"BLOCKCHAIN/FIREARMASSETS"
	"BLOCKCHAIN/UTILS"
	"encoding/json"
	"net/http"
	"strconv"

	"github.com/gorilla/mux"
)

func firearmhelp(rw http.ResponseWriter, r *http.Request) {
	data := []URLDescription{
		{
			URL:         "http://localhost:8080/firearmAssets",
			Method:      "GET",
			Description: "See All URL",
		},
		{
			URL:         "http://localhost:8080/firearmAssets/see/{serialNum}",
			Method:      "GET",
			Description: "See The {serialNum} data",
			Payload:     "{serialNum} = int",
			Example:     "http://localhost:8080/firearmAssets/see/1234567",
		},
		{
			URL:         "http://localhost:8080/firearmAssets/notes/{serialNum}/{notes}",
			Method:      "POST",
			Description: "Change The Notes Of {serialNum} Data",
			Payload:     "{serialNum} = int, {notes} = string",
			Example:     "http://localhost:8080/firearmAssets/notes/1234567/Slamfire",
		},
		{
			URL:         "http://localhost:8080/firearmAssets/ownerchange/{serialNum}/{owner}",
			Method:      "POST",
			Description: "Change The Owner Of {serialNum} Data",
			Payload:     "{serialNum} = int, {owner} = string",
			Example:     "http://localhost:8080/firearmAssets/ownerchange/1234567/20-12345678",
		},
		{
			URL:         "http://localhost:8080/firearmAssets/move/{serialNum}/{ownP}/{ownCo}/{ownBn}/{ownDiv}",
			Method:      "POST",
			Description: "Change The Location Of {serialNum} Data",
			Payload:     "{serialNum} = int {ownP} = string, {ownCo} = string, {ownBn} = string, {ownDiv}= string",
			Example:     "http://localhost:8080/firearmAssets/move/1234567/1P/1Co/1Bn/1Div",
		},
		{
			URL:         "http://localhost:8080/firearmAssets/admin/makeFireArm/{serialNum}/{model}/{note}",
			Method:      "POST",
			Description: "Make A Data About A New Firearm Data",
			Payload:     "{serialNum} = int, {model} = string, {note} = string",
			Example:     "http://localhost:8080/firearmAssets/admin/makeFireArm/1234567/K2/make",
		},
		{
			URL:         "http://localhost:8080/firearmAssets/admin/approve",
			Method:      "POST",
			Description: "Make A Block Data",
		},
		{
			URL:         "http://localhost:8080/firearmAssets/admin/mempool",
			Method:      "GET",
			Description: "See Mempool",
		},
	}
	json.NewEncoder(rw).Encode(data)
}

func approvefirearm(rw http.ResponseWriter, r *http.Request) {
	FIREARMASSETS.GetBlockchain().AddBlock()
	rw.WriteHeader(http.StatusCreated)
}

func makeFirearm(rw http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	model := vars["model"]
	notes := vars["notes"]
	serialNum, err := strconv.Atoi(vars["serialNum"])
	UTILS.HandleErr(err)
	FIREARMASSETS.Mempool.Makefirearm(model, notes, serialNum)
	rw.WriteHeader(http.StatusCreated)
}

func firearmmempool(rw http.ResponseWriter, r *http.Request) {
	m := FIREARMASSETS.Mempool
	json.NewEncoder(rw).Encode(m)
}

func seefirearmassets(rw http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	serialNum, err := strconv.Atoi(vars["serialNum"])
	UTILS.HandleErr(err)
	UTILS.HandleErr(json.NewEncoder(rw).Encode(FIREARMASSETS.GetFirArmAssetsBySerialnum(serialNum)))

}

func notefireArm(rw http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	notes := vars["notes"]
	serialNum, err := strconv.Atoi(vars["serialNum"])
	UTILS.HandleErr(err)
	uTx, err := FIREARMASSETS.NewestInfo(FIREARMASSETS.GetBlockchain(), serialNum)
	UTILS.HandleErr(err)
	FIREARMASSETS.Mempool.AddTx(uTx, uTx.Owner, uTx.Model, uTx.OwnP, uTx.OwnCo, uTx.OwnBn, uTx.OwnDiv, notes, serialNum)
	rw.WriteHeader(http.StatusCreated)
}

func ownerchange(rw http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	owner := vars["owner"]
	serialNum, err := strconv.Atoi(vars["serialNum"])
	UTILS.HandleErr(err)
	uTx, err := FIREARMASSETS.NewestInfo(FIREARMASSETS.GetBlockchain(), serialNum)
	UTILS.HandleErr(err)
	FIREARMASSETS.Mempool.AddTx(uTx, owner, uTx.Model, uTx.OwnP, uTx.OwnCo, uTx.OwnBn, uTx.OwnDiv, uTx.Notes, serialNum)
	rw.WriteHeader(http.StatusCreated)
}

func movefireArm(rw http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	ownP := vars["ownP"]
	ownCo := vars["ownCo"]
	ownBn := vars["ownBn"]
	ownDiv := vars["ownDiv"]
	serialNum, err := strconv.Atoi(vars["serialNum"])
	UTILS.HandleErr(err)
	uTx, err := FIREARMASSETS.NewestInfo(FIREARMASSETS.GetBlockchain(), serialNum)
	UTILS.HandleErr(err)
	FIREARMASSETS.Mempool.AddTx(uTx, uTx.Owner, uTx.Model, ownP, ownCo, ownBn, ownDiv, uTx.Notes, serialNum)
	rw.WriteHeader(http.StatusCreated)
}

func firearmStart(handler *mux.Router) {

	handler.HandleFunc("/firearmAssets", firearmhelp)

	handler.HandleFunc("/firearmAssets/see/{serialNum}", seefirearmassets)
	handler.HandleFunc("/firearmAssets/notes/{serialNum}/{notes}", notefireArm)
	handler.HandleFunc("/firearmAssets/ownerchange/{serialNum}/{owner}", ownerchange)
	handler.HandleFunc("/firearmAssets/move/{serialNum}/{ownP}/{ownCo}/{ownBn}/{ownDiv}", movefireArm)

	handler.HandleFunc("/firearmAssets/admin/approve", approvefirearm)
	handler.HandleFunc("/firearmAssets/admin/makeFireArm/{serialNum}/{model}/{note}", makeFirearm)
	handler.HandleFunc("/firearmAssets/admin/mempool", firearmmempool)

}
