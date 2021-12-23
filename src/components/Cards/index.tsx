import { FilmProps } from '../../contexts/filmsContext'
import { useFilms } from '../../hooks/useFilms'
import styles from './styles.module.scss'

interface CardsProps {
  films: Partial<FilmProps>[]
}

export function Cards({ films }: CardsProps) {
  const { setFilmDetails, setFilmModalOpen } = useFilms()

  async function handleShowFilmDetails(film: Partial<FilmProps>) { //abre o modal e seta as informações do filme escolhido no mesmo
    setFilmDetails(film)
    setFilmModalOpen(true)
  }

  return (
    <div className={styles.container}>
      {
        films ?
          films.map(film => (
            <div
              key={film?.id}
              onClick={() => handleShowFilmDetails(film)}
            >
              <img src={`https://image.tmdb.org/t/p/w500/${film?.poster_path}`} />
            </div>
          )) :
          <h1>Nenhum filme disponível nesta lista ainda!</h1>
      }
    </div>
  )
}