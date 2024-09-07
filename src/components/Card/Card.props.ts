import {HTMLAttributes} from 'react';

export interface PizzaCardProps
  extends HTMLAttributes<HTMLDivElement> {
  description: string
  title: string
  rate: number
  price: number
  img: string
  uid: number
}
