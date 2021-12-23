import { FilmProps } from '../../contexts/filmsContext'
import { Cards } from '../Cards'
import styles from './styles.module.scss'

interface Props {
  title: string
  filmsList: Partial<FilmProps>[]
}

export function FilmsList({ title, filmsList }: Props) {
  return (
    <section className={styles.container}>
      <h2>{title}</h2>

      <Cards films={filmsList} />
    </section>
  )
}