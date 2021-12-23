import { render, screen } from "@testing-library/react"
import '@testing-library/jest-dom/extend-expect'

import { App } from "../App"

describe('Home Page.', () => {

  test('Deve ter uma lista com título "Em cartaz".', () => {
    render(App())

    expect(screen.getByRole("heading", { name: /Em cartaz/i }))
  })

  test('Deve ter uma lista com título "Marvel".', () => {
    render(App())

    expect(screen.getByRole("heading", { name: /Marvel/i }))
  })

  test('Deve ter uma lista com título "DC Comics".', () => {
    render(App())

    expect(screen.getByRole("heading", { name: /DC Comics/i }))
  })
})