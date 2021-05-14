import React from "react"
import styles from "./button.module.scss"

export interface CircleBtnProps {
  id?: number
  link?: string
  icon: React.ReactElement
  className?: string
  onClick?: () => void
}

export const CircleBtn: React.FC<CircleBtnProps> = ({
  id,
  link,
  icon,
  className = "",
  onClick,
  ...props
}) => {
  const button = (
    <button
      type="button"
      className={[className, styles.circleBtn].join(" ")}
      onClick={onClick}
      {...props}
    >
      {icon}
    </button>
  )

  return link ? (
    <a href={link} target="_blank">
      {button}
    </a>
  ) : (
    button
  )
}
