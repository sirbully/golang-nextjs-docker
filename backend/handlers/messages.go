package handlers

import (
	"log"
	"net/http"
	"strconv"

	"github.com/gorilla/mux"
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

// Update existing message by id
func (m *Messages) UpdateMessage(rw http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id, err := strconv.Atoi(vars["id"])
	if err != nil {
		http.Error(rw, "Cannot convert id in params to int", http.StatusBadRequest)
		return
	}

	msg := &data.Message{}

	err = msg.FromJSON(r.Body)
	if err != nil {
		http.Error(rw, "Unable to parse JSON", http.StatusInternalServerError)
	}

	err = data.UpdateMessage(id, msg)
	if err == data.ErrMessageNotFound {
		http.Error(rw, data.ErrMessageNotFound.Error(), http.StatusNotFound)
		return
	}
	if err != nil {
		http.Error(rw, data.ErrMessageNotFound.Error(), http.StatusInternalServerError)
		return
	}

	// CORS headers
	rw.Header().Set("Access-Control-Allow-Origin", "*")
	rw.Header().Set("Access-Control-Allow-Headers", "Content-Type, Accept")
	rw.Header().Set("Content-Type", "application/json")
	msg.ToJSON(rw)
}

// Delete message by id
func (m *Messages) DeleteMessage(rw http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id, err := strconv.Atoi(vars["id"])
	if err != nil {
		http.Error(rw, "Cannot convert id in params to int", http.StatusBadRequest)
		return
	}

	err = data.DeleteMessage(id)
	if err == data.ErrMessageNotFound {
		http.Error(rw, data.ErrMessageNotFound.Error(), http.StatusNotFound)
		return
	}
	if err != nil {
		http.Error(rw, data.ErrMessageNotFound.Error(), http.StatusInternalServerError)
		return
	}

	// CORS headers
	rw.Header().Set("Access-Control-Allow-Origin", "*")
	rw.Header().Set("Access-Control-Allow-Headers", "Content-Type, Accept")
	rw.Header().Set("Content-Type", "application/json")
	msg := &data.Message{}
	msg.ToJSON(rw)
}
