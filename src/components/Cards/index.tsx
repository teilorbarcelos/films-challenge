import { FilmProps } from '../../contexts/filmsContext'
import { useFilms } from '../../hooks/useFilms'
import styles from './styles.module.scss'

interface CardsProps {
  films: Partial<FilmProps>[]
}

export function Cards({ films }: CardsProps) {
  const { setMovieDetails, setMovieModalOpen } = useFilms()

  async function handleShowMovieDetails(movie: Partial<FilmProps>) {
    setMovieDetails(movie)
    setMovieModalOpen(true)
  }

  return (
    <div className={styles.container}>
      {
        films.map(movie => (
          <div
            key={movie?.id}
            onClick={() => handleShowMovieDetails(movie)}
          >
            <img src={`https://image.tmdb.org/t/p/w500/${movie?.poster_path}`} />
          </div>
        ))
      }
    </div>
  )
}