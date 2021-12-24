import { fireEvent, render, screen } from "@testing-library/react"
import '@testing-library/jest-dom/extend-expect'

import { App } from "../App"
import { FilmsContext } from '../contexts/filmsContext'
import { ReactNode, useEffect, useState } from "react"

interface FilmProps {
  id: number
  title: string
  tagline: string
  runtime: number
  overview: string
  backdrop_path: string
  poster_path: string
  genres: { name: string }[]
  release_date: string
}

const now_playngTest: FilmProps[] = [
  {
    backdrop_path: "/1Rr5SrvHxMXHu5RjKpaMba8VTzi.jpg",
    id: 634649,
    overview: "Peter Parker é desmascarado e não consegue mais separar sua vida normal dos grandes riscos de ser um super-herói. Quando ele pede ajuda ao Doutor Estranho, os riscos se tornam ainda mais perigosos, e o forçam a descobrir o que realmente significa ser o Homem-Aranha.",
    poster_path: "/fVzXp3NwovUlLe7fvoRynCmBPNc.jpg",
    release_date: "2021-12-15",
    title: "Homem-Aranha: Sem Volta Para Casa",
    genres: [{ name: 'Ação' }, { name: 'Ação' }, { name: 'Ação' }],
    runtime: 148,
    tagline: "O Multiverso está aberto!",
  }
]

interface TestProviderProps {
  children: ReactNode
}

let TestProvider: ({ children }: TestProviderProps) => JSX.Element

describe('Home Page.', () => {
  beforeAll(() => {
    TestProvider = ({ children }: TestProviderProps): JSX.Element => { //Cria um Context Provider Fake para fazer os testes simulando a API
      const [filmModalOpen, setFilmModalOpen] = useState(false)
      const [filmDetails, setFilmDetails] = useState<Partial<FilmProps>>({})
      const [now_playng, setNow_playng] = useState<Partial<FilmProps>[]>([])
      const [marvel, setMarvel] = useState<Partial<FilmProps>[]>([])
      const [dcComics, setDcComics] = useState<Partial<FilmProps>[]>([])

      useEffect(() => {
        setNow_playng(now_playngTest)
      }, [])

      return (
        <FilmsContext.Provider
          value={{
            now_playng,
            marvel,
            dcComics,
            filmDetails,
            setFilmDetails,
            filmModalOpen,
            setFilmModalOpen
          }}
        >
          {children}
        </FilmsContext.Provider>
      )
    }

  })

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

  test('Deve ter um filme na lista "Em cartaz".', () => {
    render(
      <TestProvider>
        <App />
      </TestProvider>
    )

    expect(screen.getByRole("img", { name: '' }))
      .toHaveAttribute('src', 'https://image.tmdb.org/t/p/w500/fVzXp3NwovUlLe7fvoRynCmBPNc.jpg')
  })

  test('Deve mostrar o modal ao clickar na imagem do filme com os dados do mesmo.', () => {
    render(
      <TestProvider>
        <App />
      </TestProvider>
    )

    const firstFilmImage = screen.getByRole('img', { name: '' })

    expect(screen.queryByText('Homem-Aranha: Sem Volta Para Casa')).toBeNull() // modal tem que estar fechado

    fireEvent.click(firstFilmImage) // clicka no filme para abrir o modal

    expect(screen.queryByText('Homem-Aranha: Sem Volta Para Casa')) // modal tem que estar aberto
  })
})