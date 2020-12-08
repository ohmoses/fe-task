import React from "react"

import styles from "./Avatar.module.css"

type Props = {
  number: number
}

export default function Avatar({ number }: Props) {
  const imgSrc =
    process.env.PUBLIC_URL + `/assets/customer_avatars/Avatar-${number}.svg`

  return <img className={styles.avatar} src={imgSrc} alt="" />
}
