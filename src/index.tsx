import { render } from 'react-dom'
import { App } from './App'
import { FilmsProvider } from './contexts/filmsContext'

render(
  <FilmsProvider>
    <App />
  </FilmsProvider>,
  document.getElementById('root')
)