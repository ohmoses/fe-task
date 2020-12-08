import React, { ReactNode } from "react"
import classnames from "classnames"

import styles from "./ErrorMessage.module.css"

type Props = {
  children: ReactNode
  className?: string
  [prop: string]: any
}

export default function ErrorMessage({ children, className, ...props }: Props) {
  return (
    <div className={classnames(styles.container, className)} {...props}>
      <div className={styles.errorMessage}>{children}</div>
    </div>
  )
}
