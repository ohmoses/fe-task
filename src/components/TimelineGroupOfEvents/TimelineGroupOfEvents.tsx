import React, { useCallback, useState } from "react"
import classnames from "classnames"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronDown } from "@fortawesome/free-solid-svg-icons"

import { TimelineItem } from "../../helpers/organizeCustomerData"
import SourceIcon from "../SourceIcon/SourceIcon"
import Card from "../Card/Card"
import styles from "./TimelineGroupOfEvents.module.css"

type Props = {
  group: TimelineItem
}

export default function TimelineGroupOfEvents({
  group: { formattedDate, events, eventTypesUsed },
  ...props
}: Props) {
  const [isExpanded, setIsExpanded] = useState(false)

  const toggleExpand = useCallback(() => {
    setIsExpanded((s) => !s)
  }, [])

  return (
    <div className={styles.container} {...props}>
      <Card className={styles.mainCard} data-testid="main-card">
        <div className={styles.eventSummaryWrapper}>
          {eventTypesUsed.map(({ eventId, eventDef, sourceDef, count }) => (
            <div key={eventId} className={styles.eventSummary}>
              <SourceIcon
                className={styles.icon}
                iconName={sourceDef.frontend_settings.icon}
              />
              <div>
                <div
                  className={styles.eventTitle}
                >{`${count}× ${eventDef.short_title}`}</div>
                <div className={styles.eventSource}>{sourceDef.name}</div>
              </div>
            </div>
          ))}
        </div>
        <div className={styles.summaryDate}>{formattedDate}</div>
        <div className={styles.buttonWrapper}>
          <button className={styles.toggleButton} onClick={toggleExpand}>
            <FontAwesomeIcon
              className={classnames(styles.toggleIcon, {
                [styles.flipped]: isExpanded,
              })}
              icon={faChevronDown}
            />
          </button>
          <div className={styles.eventCount} data-testid="event-count">
            {events.length}
          </div>
        </div>
      </Card>
      <div
        className={styles.expandingContainer}
        style={{ maxHeight: isExpanded ? events.length * 56 + 100 + "px" : 0 }}
        data-testid="expanding-container"
      >
        {events.map(
          ({
            id,
            sourceDef: {
              frontend_settings: { icon, color },
            },
            eventDef: { title },
            formattedDateTime,
          }) => {
            return (
              <Card
                key={id}
                className={styles.detailCard}
                data-testid={`detail-card-${id}`}
              >
                <div className={styles.eventDescription}>
                  <SourceIcon className={styles.icon} iconName={icon} small />
                  <div style={{ color }}>{title}</div>
                </div>
                <div className={styles.date}>{formattedDateTime}</div>
              </Card>
            )
          },
        )}
      </div>
    </div>
  )
}
