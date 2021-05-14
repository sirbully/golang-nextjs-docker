import React from "react"
import { Form } from "../Form/Form"
import styles from "./tab.module.scss"

export const Tab: React.FC = () => {
  const [currTab, setCurrTab] = React.useState(true)

  const changeTab = (tab) => {
    setCurrTab(tab)
  }

  return (
    <>
      <div className={styles.tab}>
        <div className={styles.tabBtns}>
          <button
            className={[styles.tabBtnLeft, currTab && "bg-yellow"].join(" ")}
            onClick={() => changeTab(true)}
          >
            Leave a message
          </button>
          <button
            className={[styles.tabBtnRight, !currTab && "bg-yellow"].join(" ")}
            onClick={() => changeTab(false)}
          >
            Contributors
          </button>
        </div>
      </div>
      <div className={styles.tabContent}>
        {currTab ? <Form /> : "Contributors"}
      </div>
    </>
  )
}
