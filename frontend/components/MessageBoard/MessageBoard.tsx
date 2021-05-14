import React from "react"
import Masonry from "react-masonry-css"
import { useQuery } from "react-query"
import { Card } from "../Card"
import { Loader } from "../Loader"
import { sortDesc } from "../../utils/sort-desc"
import styles from "./messageboard.module.scss"

export type IMessage = {
  id: number
  name: string
  message: string
  updatedOn: string
}

const fetchMsgs = async () => {
  const response = await fetch(
    process.env.API_URL || "http://localhost:9090/api/messages"
  )
  if (!response.ok) throw Error("Cannot fetch messages!")
  return response.json()
}

export const MessageBoard: React.FC = () => {
  const { status, data: messages } = useQuery("messages", () => fetchMsgs())

  const breakpointColumnsObj = {
    default: 3,
    900: 2,
    500: 1,
  }

  return (
    <>
      <p className={styles.title}>message board.</p>
      {status === "loading" ? (
        <div className="flex flex-row justify-center">
          <Loader />
        </div>
      ) : (
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {messages.sort(sortDesc).map((msg) => (
            <Card key={msg.id} id={msg.id} name={msg.name} date={msg.updatedOn}>
              {msg.message}
            </Card>
          ))}
        </Masonry>
      )}
    </>
  )
}
