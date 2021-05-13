package main

import (
	"context"
	"log"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"

	"github.com/sirbully/notes/handlers"
)

func main() {
	l := log.New(os.Stdout, "messages-api", log.LstdFlags)

	// create handlers
	mh := handlers.NewMessages(l)

	// create a new serve mux and register the handlers
	sm := http.NewServeMux()
	sm.Handle("/", mh)

	// create and start server
	s := &http.Server{
		Addr:     ":9090", // bind address
		Handler:  sm,      // default handler
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
	tc, _ := context.WithTimeout(context.Background(), 30*time.Second)
	s.Shutdown(tc)
}
