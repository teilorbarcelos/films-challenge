import { useFilms } from './hooks/useFilms'
import { FilmsList } from './components/FilmsList'
import './styles/global.scss'
import { FilmModal } from './components/FilmModal'

export function App() {
  const {
    now_playng,
    marvel,
    dcComics,
  } = useFilms()

  return (
    <main>
      <FilmsList title='Em cartaz' filmsList={now_playng} />
      <FilmsList title='Marvel' filmsList={marvel} />
      <FilmsList title='DC Comics' filmsList={dcComics} />
      <FilmModal />
    </main>
  )
}