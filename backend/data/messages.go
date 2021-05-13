package data

import (
	"encoding/json"
	"io"
	"time"
)

// Message model definition
type Message struct {
	ID        int    `json:"id"`
	Message   string `json:"message"`
	CreatedOn string `json:"-"`
	UpdatedOn string `json:"updatedOn"`
}

// A collection of messages
type Messages []*Message

// ToJSON serializes the contents of the collection to JSON
// https://golang.org/pkg/encoding/json/#NewEncoder
func (m *Messages) ToJSON(w io.Writer) error {
	e := json.NewEncoder(w)
	return e.Encode(m)
}

// FromJSON parses JSON data from the request body
// https://golang.org/pkg/encoding/json/#NewDecoder
func (m *Message) FromJSON(r io.Reader) error {
	d := json.NewDecoder(r)
	return d.Decode(m)
}

// Returns a list of messages
func GetMessages() Messages {
	return messages
}

// Create new message
func CreateMessage(m *Message) {
	m.ID = getNextID()
	m.CreatedOn = time.Now().String()
	m.UpdatedOn = time.Now().String()
	messages = append(messages, m)
}

// Generate ID from the previous latest ID in the messages list
func getNextID() int {
	msgs := messages[len(messages)-1]
	return msgs.ID + 1
}

// Hard-coded data store
// TODO: persist data in a database
var messages = []*Message{
	{
		ID:        1,
		Message:   "First message!",
		CreatedOn: time.Now().String(),
		UpdatedOn: time.Now().String(),
	},
	{
		ID:        2,
		Message:   "Second message!",
		CreatedOn: time.Now().String(),
		UpdatedOn: time.Now().String(),
	},
}
