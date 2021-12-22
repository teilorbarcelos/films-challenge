import { useContext } from "react"
import { FilmsContext, FilmsContextProps } from "../contexts/filmsContext"

export function useFilms(): FilmsContextProps {
  const context = useContext(FilmsContext)

  return context
}