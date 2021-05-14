import React from "react"
import styles from "./form.module.scss"

export interface InputProps {
  value: string
  placeholder: string
  required?: boolean
  onChange: React.Dispatch<React.SetStateAction<string>>
}

export const Input: React.FC<InputProps> = ({
  value,
  placeholder,
  required = false,
  onChange,
}) => (
  <input
    type="text"
    placeholder={placeholder}
    value={value}
    onChange={(e) => onChange(e.target.value)}
    className={styles.formInput}
    required={required}
  />
)
