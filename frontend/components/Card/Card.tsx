import React from "react"
import { useMutation, useQueryClient } from "react-query"
import { formatDistanceToNow } from "date-fns"
import { Trash2 } from "react-feather"
import { CircleBtn } from "../Button"
import styles from "./card.module.scss"

export interface CardProps {
  id: number
  name: string
  date: string
  children: React.ReactNode
}

const deleteMsg = async (id) => {
  const response = await fetch(`${process.env.API_URL}/${id}`, {
    method: "delete",
  })
  if (!response.ok) throw Error("Cannot delete message!")
}

export const Card: React.FC<CardProps> = ({ id, name, date, children }) => {
  const queryClient = useQueryClient()

  const { mutateAsync: removeMsg } = useMutation(deleteMsg, {
    onSuccess: () => queryClient.invalidateQueries("messages"),
  })

  const onClick = () => {
    removeMsg(id)
      .then(() => "deleted!")
      .catch((err) => console.log(err))
  }

  const colorPalettes = [
    { body: "bg-blue", text: "text-white" },
    { body: "bg-yellow", text: "text-black" },
    { body: "bg-green", text: "text-black" },
    { body: "bg-red bg-opacity-10", text: "text-black" },
    { body: "bg-red", text: "text-white" },
    { body: "bg-yellow bg-opacity-10", text: "text-black" },
    { body: "bg-pink bg-opacity-20", text: "text-black" },
  ]

  const randIndex = Math.floor(Math.random() * 7)

  return (
    <div
      className={[
        styles.container,
        colorPalettes[randIndex].body,
        colorPalettes[randIndex].text,
      ].join(" ")}
    >
      <div className={styles.message}>
        <p className={styles.messageContent}>“{children}”</p>
      </div>
      <div className={styles.detail}>
        <div className={styles.left}>
          <p className={styles.name}>{name}</p>
          <p>{formatDistanceToNow(new Date(date))}</p>
        </div>
        <div className={styles.action}>
          <CircleBtn
            icon={<Trash2 size={15} color="black" />}
            id={id}
            className="bg-white"
            onClick={onClick}
          />
        </div>
      </div>
    </div>
  )
}
