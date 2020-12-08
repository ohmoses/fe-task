import React from "react"
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons"
import classnames from "classnames"

import styles from "./CustomerDetail.module.css"
import { StaticData } from "../../App"
import organizeCustomerData from "../../helpers/organizeCustomerData"
import SourceIcon from "../../components/SourceIcon/SourceIcon"
import TimelineGroupOfEvents from "../../components/TimelineGroupOfEvents/TimelineGroupOfEvents"
import TimelineSingleEvent from "../../components/TimelineSingleEvent/TimelineSingleEvent"
import useCustomerData from "../../hooks/useCustomerData"
import Card from "../../components/Card/Card"
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage"
import Spinner from "../../components/Spinner/Spinner"

const BackLink = () => (
  <div className={styles.backLinkWrapper}>
    <Link to="/">
      <FontAwesomeIcon icon={faChevronLeft} /> Back to search
    </Link>
  </div>
)

export default function CustomerDetail({
  staticData,
}: {
  staticData: StaticData
}) {
  const customerData = useCustomerData()
  if (staticData.isLoading || customerData.isLoading)
    return (
      <div className={styles.container}>
        <BackLink />
        <Card className={styles.topBar}>
          <div className={styles.center}>
            <Spinner />
          </div>
        </Card>
      </div>
    )

  if (staticData.error || customerData.error)
    return (
      <div className={styles.container}>
        <BackLink />
        <Card className={styles.topBar}>
          <div className={styles.center}>
            {staticData.error === customerData.error ? (
              <ErrorMessage>{staticData.error}</ErrorMessage>
            ) : (
              <>
                <ErrorMessage>{staticData.error}</ErrorMessage>
                <ErrorMessage>{customerData.error}</ErrorMessage>
              </>
            )}
          </div>
        </Card>
      </div>
    )

  if (!staticData.data || !customerData.data) return null // for typescript, will never happen

  const {
    customerFullName,
    sourceDefsWithUsage,
    timelineItems,
  } = organizeCustomerData({
    customerDetails: customerData.data.details,
    customerEvents: customerData.data.events,
    eventDefs: staticData.data.eventDefs,
    sourceDefs: staticData.data.sourceDefs,
  })

  return (
    <div className={styles.container}>
      <BackLink />
      <Card className={styles.topBar}>
        <div className={classnames("pageTitle", styles.title)}>
          {customerFullName}
        </div>
        <div className={styles.sourcesWrapper}>
          {sourceDefsWithUsage.map((sourceDef) => (
            <div
              key={sourceDef.id}
              className={classnames(styles.source, {
                [styles.disabled]: !sourceDef.isUsed,
              })}
            >
              <div className={styles.sourceIconWrapper}>
                <SourceIcon
                  iconName={sourceDef.frontend_settings.icon}
                  disabled={!sourceDef.isUsed}
                />
              </div>
              <div>{sourceDef.name}</div>
            </div>
          ))}
        </div>
      </Card>
      <div className={styles.timelineWrapper}>
        <div className={styles.midLine} />
        {timelineItems.map((item) =>
          item.type === "group" ? (
            <TimelineGroupOfEvents key={item.formattedDate} group={item} />
          ) : (
            <TimelineSingleEvent
              key={item.formattedDate}
              item={item.events[0]}
            />
          ),
        )}
      </div>
    </div>
  )
}
