import React from "react"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

import TimelineGroupOfEvents from "./TimelineGroupOfEvents"

const prestashop = {
  id: "prestashop",
  name: "Prestashop",
  frontend_settings: {
    icon: "prestashop.png",
    color: "#01579B",
  },
}

const meiro_events = {
  id: "meiro_events",
  name: "Meiro Events",
  frontend_settings: {
    icon: "meiro_events.png",
    color: "#B85888",
  },
}

const website_page_view = {
  id: "website_page_view",
  source_id: "meiro_events",
  title: "Customer visited website page",
  short_title: "Page visited",
}

const bought_products = {
  id: "bought_products",
  source_id: "prestashop",
  title: "Customer bought products",
  short_title: "Order submitted",
}

const group = {
  formattedDate: "20.10.2020",
  type: "group",
  events: [
    {
      id: 3,
      event_id: "website_page_view",
      eventDef: website_page_view,
      sourceDef: meiro_events,
      formattedDateTime: "20.10.2020, 13:14:15",
    },
    {
      id: 2,
      event_id: "bought_products",
      eventDef: bought_products,
      sourceDef: prestashop,
      formattedDateTime: "20.10.2020, 12:12:12",
    },
    {
      id: 1,
      event_id: "website_page_view",
      eventDef: website_page_view,
      sourceDef: meiro_events,
      formattedDateTime: "20.10.2020, 10:05:33",
    },
  ],
  eventTypesUsed: [
    {
      eventId: "bought_products",
      count: 1,
      eventDef: bought_products,
      sourceDef: prestashop,
    },
    {
      eventId: "website_page_view",
      count: 2,
      eventDef: website_page_view,
      sourceDef: meiro_events,
    },
  ],
}

describe("TimelineGroupOfEvents", () => {
  test("renders all information", () => {
    render(<TimelineGroupOfEvents group={group} />)

    const mainCard = screen.getByTestId("main-card")
    const detailCard1 = screen.getByTestId("detail-card-1")
    const detailCard2 = screen.getByTestId("detail-card-2")
    const detailCard3 = screen.getByTestId("detail-card-3")

    expect(mainCard).toHaveTextContent("1× Order submitted")
    expect(mainCard).toHaveTextContent("Prestashop")
    expect(mainCard).toHaveTextContent("2× Page visited")
    expect(mainCard).toHaveTextContent("Meiro Events")
    expect(mainCard).toHaveTextContent("20.10.2020")
    expect(screen.getByTestId("event-count")).toHaveTextContent("3")

    expect(detailCard1).toHaveTextContent("Customer visited website page")
    expect(detailCard1).toHaveTextContent("20.10.2020, 10:05:33")
    expect(detailCard2).toHaveTextContent("Customer bought products")
    expect(detailCard2).toHaveTextContent("20.10.2020, 12:12:12")
    expect(detailCard3).toHaveTextContent("Customer visited website page")
    expect(detailCard3).toHaveTextContent("20.10.2020, 13:14:15")
  })

  test("expands details when button is clicked", () => {
    render(<TimelineGroupOfEvents group={group} />)

    const expandingContainer = screen.getByTestId("expanding-container")

    expect(expandingContainer).toHaveStyle({ maxHeight: 0 })

    userEvent.click(screen.getByRole("button"))

    expect(expandingContainer).toHaveStyle({ maxHeight: "268px" })

    userEvent.click(screen.getByRole("button"))

    expect(expandingContainer).toHaveStyle({ maxHeight: 0 })
  })
})
