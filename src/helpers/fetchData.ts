import axios, { AxiosRequestConfig } from "axios"

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000",
  timeout: 500,
})

export type Customer = {
  id: string
  name: string
  surname: string
  created: string
}

export type CustomerEvent = {
  id: number
  event_id: string
  datetime: string
}

export type SourceDef = {
  id: string
  name: string
  frontend_settings: {
    icon: string
    color: string
  }
}

export type EventDef = {
  id: string
  source_id: string
  title: string
  short_title: string
}

export type CustomerListApiData = {
  customers: Array<Customer>
  selection_settings: {
    offset: number
    limit: number
    search: string
  }
}

export type CustomerDetailsApiData = {
  customer: Customer
}

export type CustomerEventsApiData = {
  customer_events: Array<CustomerEvent>
}

export type SourceDefsApiData = {
  sources: Array<SourceDef>
}

export type EventDefsApiData = {
  events: Array<EventDef>
}

async function fetchData<T>(path: string, options?: AxiosRequestConfig) {
  try {
    const { data }: { data: T } = await axiosInstance.get(path, options)
    return { data, error: null }
  } catch (error) {
    return { data: null, error: error.message as string }
  }
}

type CustomersParams = {
  offset?: number
  limit?: number
  search?: string
}

export function fetchCustomers(params?: CustomersParams) {
  return fetchData<CustomerListApiData>("/customers", { params })
}

export async function fetchCustomerById(id: string) {
  const detailsPromise = fetchData<CustomerDetailsApiData>(`/customers/${id}`)
  const eventsPromise = fetchData<CustomerEventsApiData>(
    `/customers/${id}/events`,
  )

  const details = await detailsPromise
  const events = await eventsPromise

  if (details.error || events.error)
    return { data: null, error: details.error ?? events.error }

  // need to assert for typescript, will always be true
  if (details.data && events.data) {
    return {
      data: {
        details: details.data?.customer,
        events: events.data?.customer_events,
      },
      error: null,
    }
  }

  return { data: null, error: null }
}

export async function fetchStaticData() {
  const sourcesPromise = fetchData<SourceDefsApiData>("/sources")
  const eventsPromise = fetchData<EventDefsApiData>("/events")

  const sources = await sourcesPromise
  const events = await eventsPromise

  if (sources.error || events.error)
    return { data: null, error: sources.error ?? events.error }

  // need to assert for typescript, will always be true
  if (sources.data && events.data) {
    return {
      data: {
        sourceDefs: sources.data.sources,
        eventDefs: events.data.events,
      },
      error: null,
    }
  }

  return { data: null, error: null }
}
