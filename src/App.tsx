import React, { useEffect, useState } from "react"
import { Provider } from "react-redux"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"

import CustomerDetail from "./views/CustomerDetail/CustomerDetail"
import CustomersList from "./views/CustomersList/CustomersList"
import { EventDef, fetchStaticData, SourceDef } from "./helpers/fetchData"
import { store } from "./store"

export type StaticData = {
  data: { sourceDefs: Array<SourceDef>; eventDefs: Array<EventDef> } | null
  error: string | null
  isLoading: boolean
}

export default function App() {
  const [staticData, setStaticData] = useState<StaticData>({
    data: null,
    error: null,
    isLoading: false,
  })

  useEffect(() => {
    async function fetch() {
      setStaticData((state) => ({ ...state, isLoading: true }))
      setStaticData({ ...(await fetchStaticData()), isLoading: false })
    }

    fetch()
  }, [])

  return (
    <React.StrictMode>
      <Provider store={store}>
        <Router>
          <Switch>
            <Route path="/customers/:id">
              <CustomerDetail staticData={staticData} />
            </Route>
            <Route path="/">
              <CustomersList />
            </Route>
          </Switch>
        </Router>
      </Provider>
    </React.StrictMode>
  )
}
