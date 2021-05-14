package handlers

import (
	"log"
	"net/http"

	"github.com/sirbully/golang-nextjs-docker/data"
)

// An http.Handler
type Messages struct {
	l *log.Logger
}

// Creates a messages handler with the given logger
func NewMessages(l *log.Logger) *Messages {
	return &Messages{l}
}

// Returns messages from in-memory data store
func (m *Messages) GetMessages(rw http.ResponseWriter, r *http.Request) {
	// CORS headers
	rw.Header().Set("Access-Control-Allow-Origin", "*")
	rw.Header().Set("Access-Control-Allow-Headers", "Content-Type, Accept")
	rw.Header().Set("Content-Type", "application/json")
	msgs := data.GetMessages()
	err := msgs.ToJSON(rw)
	if err != nil {
		http.Error(rw, "Unable to parse JSON", http.StatusInternalServerError)
	}
}

// Creates new message and adds to message list
func (m *Messages) CreateMessage(rw http.ResponseWriter, r *http.Request) {
	msg := &data.Message{}
	err := msg.FromJSON(r.Body)
	if err != nil {
		http.Error(rw, "Unable to parse JSON", http.StatusInternalServerError)
	}
	data.CreateMessage(msg)

	// CORS headers
	rw.Header().Set("Access-Control-Allow-Origin", "*")
	rw.Header().Set("Access-Control-Allow-Headers", "Content-Type, Accept")
	rw.Header().Set("Content-Type", "application/json")
	msg.ToJSON(rw)
}
