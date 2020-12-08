import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

import {
  Customer,
  CustomerEvent,
  fetchCustomerById,
} from "../helpers/fetchData"

type CustomerData = {
  data: {
    details: Customer
    events: Array<CustomerEvent>
  } | null
  error: string | null
}

export default function useCustomerData() {
  const { id } = useParams<{ id: string }>()
  const [data, setData] = useState<CustomerData>({
    data: null,
    error: null,
  })
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    async function fetchCustomerData() {
      setIsLoading(true)
      setData(await fetchCustomerById(id))
      setIsLoading(false)
    }

    fetchCustomerData()
  }, [id])

  return { data: data.data, error: data.error, isLoading }
}
