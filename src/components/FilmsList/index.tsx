import { useFilms } from '../../hooks/useFilms'
import { Cards } from '../Cards'
import styles from './styles.module.scss'

interface Props {
  title: string
  filmsList: 'now_playng' | 'marvel' | 'dcComics'
}

export function FilmsList({ title, filmsList }: Props) {
  const films = useFilms()

  return (
    <section className={styles.container}>
      <h2>{title}</h2>

      <Cards films={films[filmsList]} />
    </section>
  )
}