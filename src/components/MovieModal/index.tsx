import { useEffect, useState } from 'react'
import ReactPlayer from 'react-player'
import { FilmProps } from '../../contexts/filmsContext'
import { useFilms } from '../../hooks/useFilms'
import { api } from '../../services/api'
import { api_key } from '../../variables'
import styles from './styles.module.scss'

export function MovieModal() {
  const [releaseDate, setReleaseDate] = useState('')
  const [trailerKey, setTrailerKey] = useState<string | null>(null)
  const [currentMovie, setCurrentMovie] = useState<Partial<FilmProps>>({})
  const { movieModalOpen, setMovieModalOpen, movieDetails } = useFilms()

  async function getCurrentMovieInfo() {
    api.get(`https://api.themoviedb.org/3/movie/${movieDetails.id}/videos?api_key=${api_key}&language=pt-br`)
      .then(response => {
        if (response.data.results.length > 0) {
          setTrailerKey(response.data.results[0].key)
          return
        }

        api.get(`https://api.themoviedb.org/3/movie/${movieDetails.id}/videos?api_key=${api_key}`)
          .then(response => {
            if (response.data.results.length > 0) {
              setTrailerKey(response.data.results[0].key)
              return
            }

            setTrailerKey(null)
          })
      })

    api.get(`https://api.themoviedb.org/3/movie/${movieDetails.id}?api_key=${api_key}&language=pt-BR&append_to_response=images&include_image_language=pt-BR,null`)
      .then(response => {
        setCurrentMovie(response.data)
        dateFormat(response.data.release_date)
      })
  }

  useEffect(() => {
    if (movieDetails.id) {
      getCurrentMovieInfo()
    }
  }, [movieDetails])

  async function dateFormat(date: string) {
    const dateSplit = date.split('-')
    const dateResult = `${dateSplit[2]}/${dateSplit[1]}/${dateSplit[0]}`

    setReleaseDate(dateResult)
  }

  return (
    <section className={`${styles.container} ${movieModalOpen ? styles.visible : ''}`}>
      <p
        onClick={() => setMovieModalOpen(false)}
        className={styles.closeButton}
      >Fechar X</p>

      <div className={styles.movieInfo}>
        <div className={styles.description}>
          <h1>{movieDetails.title}</h1>
          {
            currentMovie.tagline && currentMovie.tagline !== '' &&
            <h2>{currentMovie.tagline}</h2>
          }

          <p><span>Estréia: </span> {releaseDate}</p>
          <p><span>Gênero: </span> {
            currentMovie.genres?.map((genre, index) =>
            (currentMovie.genres && index === currentMovie.genres?.length - 1 ?
              `${genre.name}.` : `${genre.name}, `))
          }</p>
          <p><span>Duração: </span>{currentMovie.runtime} min.</p>

          <p>{currentMovie.overview}</p>
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

      </div>
    </section>
  )
}