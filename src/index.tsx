import React from "react"
import ReactDOM from "react-dom"

import App from "./App"
import "./index.css"

export const DATE_FORMAT = "d.M.y"
export const DATETIME_FORMAT = DATE_FORMAT + ", HH:mm:ss"

ReactDOM.render(<App />, document.getElementById("root"))
