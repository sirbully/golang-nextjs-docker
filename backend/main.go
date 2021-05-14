package main

import (
	"context"
	"log"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"

	"github.com/gorilla/mux"
	"github.com/sirbully/golang-nextjs-docker/handlers"
)

func main() {
	l := log.New(os.Stdout, "messages-api", log.LstdFlags)

	// create a new gorilla mux
	r := mux.NewRouter()

	// initialize message handler and register the handlers to mux
	mh := handlers.NewMessages(l)
	r.HandleFunc("/healthcheck", func(rw http.ResponseWriter, r *http.Request) {
		rw.Write([]byte("Healthy"))
	})
	r.HandleFunc("/api/messages", mh.GetMessages).Methods(http.MethodGet, http.MethodOptions)
	r.HandleFunc("/api/messages", mh.CreateMessage).Methods(http.MethodPost, http.MethodOptions)
	r.HandleFunc("/api/messages/{id:[0-9]+}", mh.UpdateMessage).Methods(http.MethodPut, http.MethodOptions)
	r.HandleFunc("/api/messages/{id:[0-9]+}", mh.DeleteMessage).Methods(http.MethodDelete, http.MethodOptions)

	// create and start server
	s := &http.Server{
		Addr:     ":9090", // bind address
		Handler:  r,       // default handler
		ErrorLog: l,       // logger for the server
	}
	go func() {
		l.Println("Listening on port 9090")
		log.Fatal(s.ListenAndServe())
	}()

	// trap terminate or interrupt
	c := make(chan os.Signal, 1)
	signal.Notify(c, os.Interrupt)
	signal.Notify(c, syscall.SIGTERM)

	// block shutdown until terminal/interrupt signal received
	// ⛔️ DON'T DELETE! This will shutdown server immediately
	sig := <-c
	l.Println("Gracefully shutting down...", sig)

	// gracefully shutdown server, waiting max 30 seconds for current operations to complete
	tc, cancel := context.WithTimeout(context.Background(), 30*time.Second)
	cancel()
	s.Shutdown(tc)
}
