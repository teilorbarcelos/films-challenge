import { FilmProps } from '../../contexts/filmsContext'
import styles from './styles.module.scss'

interface CardsProps {
  films: (FilmProps | undefined)[]
}

export function Cards({ films }: CardsProps) {
  return (
    <div className={styles.cardsGrid}>
      {
        films.map(film => (
          <div key={film?.id}>
            <img src={`https://image.tmdb.org/t/p/w500/${film?.poster_path}`} />
          </div>
        ))
      }
    </div>
  )
}