import React from "react"
import styles from "./loader.module.scss"

export const Loader: React.FC = () => (
  <div className={styles.loadingIOSpinner}>
    <div className={styles.spinner}>
      <div></div>
      <div>
        <div></div>
      </div>
    </div>
  </div>
)
