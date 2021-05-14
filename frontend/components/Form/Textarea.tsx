import React from "react"
import styles from "./form.module.scss"

export interface TextareaProps {
  value: string
  placeholder: string
  rows?: number
  required?: boolean
  onChange: React.Dispatch<React.SetStateAction<string>>
}

export const Textarea: React.FC<TextareaProps> = ({
  value,
  placeholder,
  rows = 10,
  required = false,
  onChange,
}) => (
  <textarea
    placeholder={placeholder}
    rows={rows}
    className={styles.formInput}
    required={required}
    value={value}
    onChange={(e) => onChange(e.target.value)}
  ></textarea>
)
