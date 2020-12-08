import React from "react"

import { CustomerEventWithSources } from "../../helpers/organizeCustomerData"
import SourceIcon from "../SourceIcon/SourceIcon"
import Card from "../Card/Card"
import styles from "./TimelineSingleEvent.module.css"

type Props = {
  item: CustomerEventWithSources
}

export default function TimelineSingleEvent({
  item: {
    id,
    formattedDateTime,
    eventDef: { title },
    sourceDef: {
      frontend_settings: { icon, color },
    },
  },
  ...props
}: Props) {
  return (
    <Card className={styles.container} {...props}>
      <div className={styles.eventDescription}>
        <SourceIcon className={styles.icon} iconName={icon} />
        <div style={{ color }}>{title}</div>
      </div>
      <div className={styles.date}>{formattedDateTime}</div>
    </Card>
  )
}
