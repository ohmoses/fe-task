import React from "react"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

import SearchInput from "./SearchInput"

describe("SearchInput", () => {
  test("has autofocus", () => {
    const mock = jest.fn()

    render(<SearchInput onSearch={mock} />)

    expect(screen.getByRole("textbox")).toHaveFocus()
  })

  test("calls the callback on button click", () => {
    const mock = jest.fn()

    render(<SearchInput onSearch={mock} />)

    userEvent.click(screen.getByRole("button"))

    expect(mock).toHaveBeenCalledTimes(1)
  })

  test("calls the callback on pressing Enter", () => {
    const mock = jest.fn()

    render(<SearchInput onSearch={mock} />)

    userEvent.type(screen.getByRole("textbox"), "{enter}")

    expect(mock).toHaveBeenCalledTimes(1)
  })

  test("changes displayed input value upon typing", () => {
    const mock = jest.fn()

    render(<SearchInput onSearch={mock} />)

    const input = screen.getByRole("textbox")

    userEvent.type(input, "hello")

    expect(input).toHaveValue("hello")
  })

  test("displays received initial value", () => {
    const mock = jest.fn()

    render(<SearchInput onSearch={mock} initialValue="hello" />)

    expect(screen.getByRole("textbox")).toHaveValue("hello")
  })

  test("calls callback with initial value", () => {
    const mock = jest.fn()

    render(<SearchInput onSearch={mock} initialValue="hello" />)

    userEvent.click(screen.getByRole("button"))

    expect(mock).toHaveBeenCalledWith("hello")
  })

  test("calls callback with empty string", () => {
    const mock = jest.fn()

    render(<SearchInput onSearch={mock} />)

    userEvent.click(screen.getByRole("button"))

    expect(mock).toHaveBeenCalledWith("")
  })

  test("calls callback with typed query", () => {
    const mock = jest.fn()

    render(<SearchInput onSearch={mock} />)

    userEvent.type(screen.getByRole("textbox"), "hello")
    userEvent.click(screen.getByRole("button"))

    expect(mock).toHaveBeenCalledWith("hello")
  })

  test("appends to initial value", () => {
    const mock = jest.fn()

    render(<SearchInput onSearch={mock} initialValue="hello" />)

    userEvent.type(screen.getByRole("textbox"), " world")
    userEvent.click(screen.getByRole("button"))

    expect(mock).toHaveBeenCalledWith("hello world")
  })

  test("keeps input value after firing callback", () => {
    const mock = jest.fn()

    render(<SearchInput onSearch={mock} />)

    const input = screen.getByRole("textbox")

    userEvent.type(input, "hello")
    userEvent.click(screen.getByRole("button"))

    expect(input).toHaveValue("hello")

    userEvent.type(screen.getByRole("textbox"), " world")
    userEvent.click(screen.getByRole("button"))

    expect(input).toHaveValue("hello world")

    expect(mock).toHaveBeenNthCalledWith(1, "hello")
    expect(mock).toHaveBeenNthCalledWith(2, "hello world")
  })
})
