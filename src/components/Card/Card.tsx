import React, { ReactNode } from "react"
import classnames from "classnames"

import styles from "./Card.module.css"

type Props = {
  children: ReactNode
  className?: string
  [prop: string]: any
}

export default function Card({ children, className, ...props }: Props) {
  return (
    <div className={classnames(styles.card, className)} {...props}>
      {children}
    </div>
  )
}
