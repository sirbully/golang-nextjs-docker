import React from "react"
import styles from "./button.module.scss"

export interface ButtonProps {
  type: "button" | "submit"
  label: string
  className?: string
  onClick?: () => void
}

export const Button: React.FC<ButtonProps> = ({
  type,
  label,
  className = "",
  ...props
}) => (
  <button
    type={type}
    className={[className, styles.btn].join(" ")}
    {...props}
  >
    {label}
  </button>
)
