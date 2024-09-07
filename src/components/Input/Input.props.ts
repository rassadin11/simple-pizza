import {HTMLInputTypeAttribute, InputHTMLAttributes} from 'react'

export interface InputProps
  extends InputHTMLAttributes<HTMLInputElement> {
  type: HTMLInputTypeAttribute
  placeholder: string
  text: string
  name: string
  isValid?: boolean
}
