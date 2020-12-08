import { useSelector } from "react-redux"
import { combineReducers, createStore } from "redux"
import {
  Action,
  ActionFunction1,
  createAction,
  handleAction,
  handleActions,
} from "redux-actions"

import { Customer } from "./helpers/fetchData"

type A1<T> = ActionFunction1<T, Action<T>>

/* Customers list reducer */
type CustomersListState = {
  data: Array<Customer> | null
  error: string | null
}

export const setCustomersList: A1<CustomersListState> = createAction(
  "SET_CUSTOMERS_LIST",
)
export const appendCustomersList: A1<CustomersListState> = createAction(
  "APPEND_CUSTOMERS_LIST",
)

const customers = handleActions<CustomersListState>(
  {
    SET_CUSTOMERS_LIST: (_, { payload }) => payload,
    APPEND_CUSTOMERS_LIST: (state, { payload }) => ({
      // deliberately doesn't delete previous state even if there's an error
      data: state.data ? state.data.concat(payload.data ?? []) : payload.data,
      error: payload.error,
    }),
  },
  { data: null, error: null },
)

/* Query reducer */
export const setQuery: A1<string> = createAction("SET_QUERY")

const query = handleAction(setQuery, (_, { payload }) => payload, "")

/* Offset reducer */
export const setOffset: A1<number> = createAction("SET_OFFSET")

const offset = handleAction(setOffset, (_, { payload }) => payload, 0)

/* --- */
const rootReducer = combineReducers({
  customers,
  query,
  offset,
})

export type State = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer)

export function useStoreValue<K extends keyof State>(key: K): State[K] {
  return useSelector((s: State) => s[key])
}
