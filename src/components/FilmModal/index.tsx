import { useEffect, useState } from 'react'
import ReactPlayer from 'react-player'
import { FilmProps } from '../../contexts/filmsContext'
import { useFilms } from '../../hooks/useFilms'
import { api } from '../../services/api'
import { api_key } from '../../variables'
import styles from './styles.module.scss'

export function FilmModal() {
  const [releaseDate, setReleaseDate] = useState('')
  const [trailerKey, setTrailerKey] = useState<string | null>(null)
  const [currentFilm, setCurrentFilm] = useState<Partial<FilmProps>>({})
  const { filmModalOpen, setFilmModalOpen, filmDetails } = useFilms()

  async function getCurrentFilmInfo() { // função que atualiza as informações na tela de acordo com o filme escolhido pelo usuário
    api.get(`https://api.themoviedb.org/3/movie/${filmDetails.id}/videos?api_key=${api_key}&language=pt-br`)
      .then(response => {
        if (response.data.results.length > 0) {
          setTrailerKey(response.data.results[0].key)
          return
        }

        api.get(`https://api.themoviedb.org/3/movie/${filmDetails.id}/videos?api_key=${api_key}`)
          .then(response => {
            if (response.data.results.length > 0) {
              setTrailerKey(response.data.results[0].key)
              return
            }

            setTrailerKey(null)
          })
      })

    api.get(`https://api.themoviedb.org/3/movie/${filmDetails.id}?api_key=${api_key}&language=pt-BR&append_to_response=images&include_image_language=pt-BR,null`)
      .then(response => {
        setCurrentFilm(response.data)
        dateFormat(response.data.release_date)
      })
  }

  useEffect(() => { // dispara a função que pega as informações do filme toda vez que o usuário clickar em um filme diferente
    if (filmDetails && filmDetails.id) {
      getCurrentFilmInfo()
    }
  }, [filmDetails])

  async function dateFormat(date: string) { // formata a data de lançamento
    const dateSplit = date.split('-')
    const dateResult = `${dateSplit[2]}/${dateSplit[1]}/${dateSplit[0]}`

    setReleaseDate(dateResult)
  }

  return (
    <section className={`${styles.container} ${filmModalOpen ? styles.visible : ''}`}>
      <p
        onClick={() => setFilmModalOpen(false)}
        className={styles.closeButton}
      >Fechar X</p>

      {
        filmDetails ?

          <div className={styles.filmInfo}>
            <div className={styles.description}>
              <h1>{filmDetails.title}</h1>

              {
                currentFilm.tagline && currentFilm.tagline !== '' &&
                <h2>{currentFilm.tagline}</h2>
              }

              <p><span>Estréia: </span> {releaseDate}</p>
              <p><span>Gênero: </span> {
                currentFilm.genres?.map((genre, index) =>
                (currentFilm.genres && index === currentFilm.genres?.length - 1 ?
                  `${genre.name}.` : `${genre.name}, `))
              }</p>
              <p><span>Duração: </span>{currentFilm.runtime} min.</p>

              <p>{currentFilm.overview}</p>
            </div>

            <div className={styles.playerWrapper}>
              {
                trailerKey ?
                  <ReactPlayer
                    url={`https://www.youtube.com/watch?v=${trailerKey}`}
                    className={styles.player}
                    width='100%'
                    height='100%'
                  />
                  :
                  <h3>Trailer não disponível ainda!</h3>
              }
            </div>
          </div> :

          <h1>Nenhuma informação disponível no momento!</h1>
      }
    </section>
  )
}