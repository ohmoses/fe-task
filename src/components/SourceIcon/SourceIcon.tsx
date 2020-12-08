import React from "react"
import classnames from "classnames"

import styles from "./SourceIcon.module.css"

type Props = {
  iconName: string
  small?: boolean
  disabled?: boolean
  className?: string
}

export default function SourceIcon({
  iconName,
  small,
  disabled,
  className,
}: Props) {
  const imgSrc = process.env.PUBLIC_URL + `/assets/source_logos/${iconName}`

  return (
    <img
      className={classnames(className, styles.img, {
        [styles.small]: small,
        [styles.disabled]: disabled,
      })}
      src={imgSrc}
      alt=""
    />
  )
}
