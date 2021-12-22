import { useFilms } from '../../hooks/useFilms'
import { Cards } from '../Cards'
import styles from './styles.module.scss'

export function InTheaters() {
  const { now_playng } = useFilms()

  return (
    <section className={styles.inTheaters}>
      <h2>Em cartaz</h2>

      <Cards films={now_playng} />
    </section>
  )
}