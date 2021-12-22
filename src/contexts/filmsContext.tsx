import { createContext, ReactNode, useEffect, useState } from "react"
import { api_key } from "../variables"
import { api } from "../services/api"

export type FilmProps = {
  id: number
  title: string
  tagline: string
  runtime: number
  overview: string
  backdrop_path: string
  poster_path: string
  genres: { name: string }[]
  release_date: string
  images: {
    backdrops: {
      file_path: string
    }[]
  }
}

type FilmsProviderProps = {
  children: ReactNode
}

export type FilmsContextProps = {
  now_playng: Partial<FilmProps[]>
  dcComics: Partial<FilmProps[]>
  marvel: Partial<FilmProps[]>
}

export const FilmsContext = createContext<FilmsContextProps>({} as FilmsContextProps)

export function FilmsProvider({ children }: FilmsProviderProps) {
  const [now_playng, setNow_playng] = useState<Partial<FilmProps[]>>([])
  const [marvel, setMarvel] = useState<Partial<FilmProps[]>>([])
  const [dcComics, setDcComics] = useState<Partial<FilmProps[]>>([])

  async function getFilms() {
    api.get(`/3/movie/now_playing?page=1&api_key=${api_key}&language=pt-BR`)
      .then(response => setNow_playng(response.data.results as Partial<FilmProps[]>))

    api.get(`/4/list/1?page=1&api_key=${api_key}&language=pt-BR`)
      .then(response => setMarvel(response.data.results as Partial<FilmProps[]>))

    api.get(`/4/list/3?page=1&api_key=${api_key}&language=pt-BR`)
      .then(response => setDcComics(response.data.results as Partial<FilmProps[]>))
  }

  useEffect(() => {
    getFilms()
  }, [])

  return (
    <FilmsContext.Provider value={{ now_playng, marvel, dcComics }}>
      {children}
    </FilmsContext.Provider>
  )
}