package data

import (
	"encoding/json"
	"fmt"
	"io"
	"time"
)

// Message model definition
type Message struct {
	ID        int       `json:"id"`
	Name      string    `json:"name"`
	Message   string    `json:"message"`
	CreatedOn time.Time `json:"-"`
	UpdatedOn time.Time `json:"updatedOn"`
}

// A collection of messages
type Messages []*Message

// ToJSON serializes the contents of the collection to JSON
// https://golang.org/pkg/encoding/json/#NewEncoder
func (m *Messages) ToJSON(w io.Writer) error {
	e := json.NewEncoder(w)
	return e.Encode(m)
}

// ToJSON serializes the contents of the collection to JSON
// https://golang.org/pkg/encoding/json/#NewEncoder
func (m *Message) ToJSON(w io.Writer) error {
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
	m.CreatedOn = time.Now()
	m.UpdatedOn = time.Now()
	messages = append(messages, m)
}

// Update existing message
func UpdateMessage(id int, m *Message) error {
	_, pos, err := getMessage(id)
	if err != nil {
		return err
	}

	m.ID = id
	m.UpdatedOn = time.Now()
	messages[pos] = m

	return nil
}

func DeleteMessage(id int) error {
	_, pos, err := getMessage(id)
	if err != nil {
		return err
	}

	removeMessage(pos)
	return nil
}

// Generate ID from the previous latest ID in the messages list
func getNextID() int {
	msgs := messages[len(messages)-1]
	return msgs.ID + 1
}

// Get message by id
func getMessage(id int) (*Message, int, error) {
	for i, m := range messages {
		if m.ID == id {
			return m, i, nil
		}
	}
	return nil, -1, ErrMessageNotFound
}

// Delete message in temporary data store
func removeMessage(index int) {
	ret := make(Messages, 0)
	ret = append(ret, messages[:index]...)
	messages = append(ret, messages[index+1:]...)
}

var ErrMessageNotFound = fmt.Errorf("Message not found")

// Hard-coded data store
// TODO: persist data in a database
var messages = Messages{
	{
		ID:        1,
		Name:      "Krizza",
		Message:   "this was created with go and next.js!",
		CreatedOn: time.Now(),
		UpdatedOn: time.Now(),
	},
	{
		ID:        2,
		Name:      "Krizza",
		Message:   "learned a lot at build@mercari",
		CreatedOn: time.Now(),
		UpdatedOn: time.Now(),
	},
}
