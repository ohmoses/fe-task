import { format, parseJSON } from "date-fns"
import React, { useCallback, useState } from "react"
import { useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import classnames from "classnames"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronRight } from "@fortawesome/free-solid-svg-icons"

import styles from "./CustomersList.module.css"
import Avatar from "../../components/Avatar/Avatar"
import { fetchCustomers } from "../../helpers/fetchData"
import SearchInput from "../../components/SearchInput/SearchInput"
import {
  appendCustomersList,
  setCustomersList,
  setOffset,
  setQuery,
  useStoreValue,
} from "../../store"
import { DATETIME_FORMAT } from "../.."
import Card from "../../components/Card/Card"
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage"
import Spinner from "../../components/Spinner/Spinner"

const LIMIT = 10

export default function CustomersList() {
  const dispatch = useDispatch()
  const customers = useStoreValue("customers")
  const query = useStoreValue("query")
  const offset = useStoreValue("offset")
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingMore, setIsLoadingMore] = useState(false)

  const doSearch = useCallback(
    async (query: string) => {
      dispatch(setQuery(query))

      setIsLoading(true)

      const { data, error } = await fetchCustomers({
        search: query.length > 0 ? query : undefined,
        limit: LIMIT,
      })

      if (error) {
        dispatch(setCustomersList({ error, data: null }))
      } else if (data) {
        dispatch(setCustomersList({ data: data.customers, error: null }))
      }

      setIsLoading(false)
    },
    [dispatch],
  )

  const loadMore = useCallback(async () => {
    setIsLoadingMore(true)

    const { data, error } = await fetchCustomers({
      search: query.length > 0 ? query : undefined,
      offset: offset + LIMIT,
      limit: LIMIT,
    })

    if (error) {
      dispatch(appendCustomersList({ error, data: null }))
    } else if (data) {
      dispatch(appendCustomersList({ data: data.customers, error: null }))
      dispatch(setOffset(offset + LIMIT))
    }

    setIsLoadingMore(false)
  }, [dispatch, query, offset])

  return (
    <div className={styles.container}>
      <Card className={styles.topBar}>
        <div className={classnames("pageTitle", styles.title)}>
          Customer search
        </div>
        <div className={styles.searchWrapper}>
          <SearchInput initialValue={query} onSearch={doSearch} />
        </div>
        <div className={styles.filler} />
      </Card>
      {(customers.data || customers.error || isLoading) && (
        <Card className={styles.mainCard}>
          {isLoading && <Spinner className={styles.spinner} />}
          {customers.error && !isLoading && (
            <ErrorMessage>{customers.error}</ErrorMessage>
          )}
          {customers.data && !isLoading && (
            <table className={styles.customersTable}>
              <thead className={styles.tableHeader}>
                <tr>
                  <td></td>
                  <td>Name</td>
                  <td>User created</td>
                  <td></td>
                </tr>
              </thead>
              <tbody>
                {customers.data?.map(
                  ({ name, surname, id, created }, index) => {
                    const fullName = `${name} ${surname}`
                    const formattedDate = format(
                      parseJSON(created),
                      DATETIME_FORMAT,
                    )

                    return (
                      <Link
                        key={id}
                        to={`customers/${id}`}
                        className={styles.tableRow}
                      >
                        <td>
                          <Avatar number={index % 17} />
                        </td>
                        <td>
                          <span className={styles.customerName}>
                            {fullName}
                          </span>
                        </td>
                        <td>{formattedDate}</td>
                        <td>
                          <FontAwesomeIcon icon={faChevronRight} />
                        </td>
                      </Link>
                    )
                  },
                )}
              </tbody>
            </table>
          )}
          {customers.data && !isLoading && (
            <div className={styles.showMoreButtonWrapper}>
              <button
                className={styles.showMoreButton}
                disabled={isLoadingMore}
                onClick={loadMore}
              >
                {isLoadingMore ? <Spinner size={20} /> : "Show more"}
              </button>
            </div>
          )}
        </Card>
      )}
    </div>
  )
}
