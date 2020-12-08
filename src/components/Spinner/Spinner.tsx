import React from "react"
import classnames from "classnames"

import styles from "./Spinner.module.css"
import spinner from "./oval.svg"

type Props = {
  size?: number
  className?: string
  [prop: string]: any
}

export default function Spinner({ size = 38, className, ...props }: Props) {
  return (
    <div className={classnames(styles.container, className)} {...props}>
      <img src={spinner} alt="Loading…" width={size} height={size} />
    </div>
  )
}
