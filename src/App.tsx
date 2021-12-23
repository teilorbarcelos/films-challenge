import { FilmsList } from './components/FilmsList'
import './styles/global.scss'
import { FilmModal } from './components/FilmModal'

export function App() {

  return (
    <main>
      <FilmsList title='Em cartaz' filmsList={'now_playng'} />
      <FilmsList title='Marvel' filmsList={'marvel'} />
      <FilmsList title='DC Comics' filmsList={'dcComics'} />
      <FilmModal />
    </main>
  )
}