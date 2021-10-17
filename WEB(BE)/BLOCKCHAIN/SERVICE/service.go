package SERVICE

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	"github.com/gorilla/mux"
)

var port string = ":8080"

type URLDescription struct {
	URL         string `json:"url"`
	Method      string `json:"method"`
	Description string `json:"description"`
	Payload     string `json:"payload,omitempty"`
	Example     string `json:"example,omitempty"`
}

func help(rw http.ResponseWriter, r *http.Request) {
	data := []URLDescription{
		{
			URL:         "http://localhost:8080/fooddata",
			Method:      "GET",
			Description: "See All URL About Fooddata",
		},
		{
			URL:         "http://localhost:8080/firearmAssets",
			Method:      "GET",
			Description: "See All URL About FirearmAssets",
		},
	}
	json.NewEncoder(rw).Encode(data)
}

func jsonContentTypeMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(rw http.ResponseWriter, r *http.Request) {
		rw.Header().Add("Content-Type", "application/json")
		next.ServeHTTP(rw, r)
	})
}

func Start() {
	handler := mux.NewRouter()
	handler.Use(jsonContentTypeMiddleware)
	handler.HandleFunc("/help", help)

	firearmStart(handler)
	foodStart(handler)

	fmt.Println("Listening on http://localhost:8080")
	log.Fatal(http.ListenAndServe(port, handler))
}
