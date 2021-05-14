import React from "react"
import { GitHub, Figma } from "react-feather"
import { Input, Textarea } from "../Form"
import { Button, CircleBtn } from "../Button"
import { useMutation, useQueryClient } from "react-query"

const createMsg = async (msg) => {
  const response = await fetch(
    process.env.API_URL || "http://localhost:9090/api/messages",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(msg),
    }
  )

  if (!response.ok) {
    throw Error("Cannot create new message!")
  }
}

export const Form: React.FC = () => {
  const queryClient = useQueryClient()
  const [author, setAuthor] = React.useState("")
  const [message, setMessage] = React.useState("")

  const { mutateAsync: addMsg } = useMutation(createMsg, {
    onSuccess: () => queryClient.invalidateQueries("messages"),
  })

  const onSubmit = (event) => {
    event.preventDefault()
    const data = { name: author, message: message }
    addMsg(data).then(() => {
      setAuthor("")
      setMessage("")
    })
  }

  return (
    <form autoComplete="off" onSubmit={onSubmit} className="flex flex-col">
      <Input
        placeholder="Author"
        value={author}
        onChange={setAuthor}
        required
      />
      <Textarea
        placeholder="Message"
        value={message}
        onChange={setMessage}
        required
      ></Textarea>
      <div className="flex flex-row justify-between">
        <div>
          <CircleBtn
            icon={<GitHub size={20} />}
            className="mr-2 hover:bg-pink"
            link="https://github.com/sirbully/golang-nextjs-docker"
          />
          <CircleBtn
            icon={<Figma size={20} />}
            className="hover:bg-green"
            link="https://www.figma.com/community/file/833515051385038928/contra-wireframe-kit"
          />
        </div>
        <Button type="submit" label="Post" className="bg-yellow" />
      </div>
    </form>
  )
}
