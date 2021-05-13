package handlers

import (
	"log"
	"net/http"

	"github.com/sirbully/notes/data"
)

type Messages struct {
	l *log.Logger
}

func NewMessages(l *log.Logger) *Messages {
	return &Messages{l}
}

func (m *Messages) ServeHTTP(rw http.ResponseWriter, r *http.Request) {
	if r.Method == http.MethodGet {
		m.getMessages(rw, r)
		return
	}

	if r.Method == http.MethodPost {
		m.createMessage(rw, r)
		return
	}

	rw.WriteHeader(http.StatusMethodNotAllowed)
	rw.Write([]byte("NO 😃\n"))
}

func (m *Messages) getMessages(rw http.ResponseWriter, r *http.Request) {
	msgs := data.GetMessages()
	err := msgs.ToJSON(rw)
	if err != nil {
		m.l.Fatal(err)
		http.Error(rw, "Unable to parse JSON", http.StatusInternalServerError)
	}
}

func (m *Messages) createMessage(rw http.ResponseWriter, r *http.Request) {
	msg := &data.Message{}
	err := msg.FromJSON(r.Body)
	if err != nil {
		m.l.Fatal(err)
		http.Error(rw, "Unable to parse JSON", http.StatusInternalServerError)
	}
	data.CreateMessage(msg)
}
