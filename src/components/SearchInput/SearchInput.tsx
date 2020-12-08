import React, { useCallback, useState } from "react"
import { faSearch } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import styles from "./SearchInput.module.css"

type Props = {
  initialValue?: string
  onSearch: (query: string) => any
}

export default function SearchInput({ initialValue = "", onSearch }: Props) {
  const [query, setQuery] = useState(initialValue)

  const searchOnEnter = useCallback(
    (e) => {
      if (e.key === "Enter") {
        onSearch(query)
      }
    },
    [onSearch, query],
  )
  const updateQuery = useCallback((e) => setQuery(e.target.value), [])
  const doSearch = useCallback(() => onSearch(query), [onSearch, query])

  return (
    <div className={styles.container}>
      <input
        className={styles.input}
        type="text"
        value={query}
        onChange={updateQuery}
        onKeyPress={searchOnEnter}
        autoFocus
        placeholder="Search attributes, customers, and more…"
        data-testid="search-input"
      />
      <button
        className={styles.button}
        onClick={doSearch}
        data-testid="search-button"
      >
        <FontAwesomeIcon icon={faSearch} />
      </button>
    </div>
  )
}
