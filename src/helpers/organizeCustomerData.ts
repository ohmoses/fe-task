import { format, isBefore, isEqual, isSameDay, parseJSON } from "date-fns"

import { DATETIME_FORMAT, DATE_FORMAT } from ".."
import { Customer, CustomerEvent, EventDef, SourceDef } from "./fetchData"

export type CustomerEventWithSources = CustomerEvent & {
  parsedDateTime: Date
  formattedDateTime: string
  formattedDate: string
  eventDef: EventDef
  sourceDef: SourceDef
}

type EventTypeUsedWithCount = {
  eventId: string
  count: number
  eventDef: EventDef
  sourceDef: SourceDef
}

type TimelineItemBase = {
  date: Date
  formattedDateTime: string
  formattedDate: string
  type: "single" | "group"
  events: Array<CustomerEventWithSources>
  eventTypesMap: {
    [eventId: string]: EventTypeUsedWithCount
  }
}

export type TimelineItem = TimelineItemBase & {
  eventTypesUsed: Array<EventTypeUsedWithCount>
}

export default function organizeCustomerData({
  customerEvents,
  customerDetails,
  eventDefs,
  sourceDefs,
}: {
  customerEvents: Array<CustomerEvent>
  customerDetails: Customer
  eventDefs: Array<EventDef>
  sourceDefs: Array<SourceDef>
}) {
  const customerFullName = `${customerDetails.name} ${customerDetails.surname}`

  const eventDefMap: { [id: string]: EventDef } = {}
  const sourceDefMap: { [id: string]: SourceDef } = {}

  for (const eventDef of eventDefs) {
    eventDefMap[eventDef.id] = eventDef
  }

  for (const sourceDef of sourceDefs) {
    sourceDefMap[sourceDef.id] = sourceDef
  }

  const customerEventsWithSources = customerEvents.map((customerEvent) => {
    const eventDef = eventDefMap[customerEvent.event_id]
    const sourceDef = sourceDefMap[eventDef.source_id]
    const parsedDateTime = parseJSON(customerEvent.datetime)

    return {
      ...customerEvent,
      eventDef,
      sourceDef,
      parsedDateTime,
      formattedDateTime: format(parsedDateTime, DATETIME_FORMAT),
      formattedDate: format(parsedDateTime, DATE_FORMAT),
    }
  })

  customerEventsWithSources.sort(
    ({ parsedDateTime: dateA }, { parsedDateTime: dateB }) =>
      isEqual(dateA, dateB) ? 0 : isBefore(dateA, dateB) ? 1 : -1,
  )

  const timelineItems = customerEventsWithSources
    .reduce<Array<TimelineItemBase>>((timeline, customerEvent, i) => {
      if (
        i > 0 &&
        isSameDay(
          customerEvent.parsedDateTime,
          customerEventsWithSources[i - 1].parsedDateTime,
        )
      ) {
        const lastItem = timeline[timeline.length - 1]

        lastItem.events.push(customerEvent)
        lastItem.type = "group"

        if (lastItem.eventTypesMap[customerEvent.event_id]) {
          lastItem.eventTypesMap[customerEvent.event_id].count += 1
        } else {
          lastItem.eventTypesMap[customerEvent.event_id] = {
            eventId: customerEvent.event_id,
            count: 1,
            eventDef: customerEvent.eventDef,
            sourceDef: customerEvent.sourceDef,
          }
        }

        return timeline
      } else {
        timeline.push({
          date: customerEvent.parsedDateTime,
          formattedDateTime: customerEvent.formattedDateTime,
          formattedDate: customerEvent.formattedDate,
          type: "single",
          eventTypesMap: {
            [customerEvent.event_id]: {
              eventId: customerEvent.event_id,
              count: 1,
              eventDef: customerEvent.eventDef,
              sourceDef: customerEvent.sourceDef,
            },
          },
          events: [customerEvent],
        })

        return timeline
      }
    }, [])
    .map((item) => ({
      ...item,
      eventTypesUsed: Object.values(item.eventTypesMap),
    }))

  const sourceIdsUsed = customerEventsWithSources.map(
    ({ sourceDef: { id } }) => id,
  )

  const sourceDefsWithUsage = sourceDefs.map((sourceDef) => ({
    ...sourceDef,
    isUsed: sourceIdsUsed.includes(sourceDef.id),
  }))

  return {
    customerFullName,
    sourceDefsWithUsage,
    timelineItems,
  }
}
