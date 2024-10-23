import './App.css'
import Game from './components/Game'
import imgUrl from '../images/github-mark.png'

function App() {
  
  return (
    <>
      <header>
        <h1 className='heading'>Fake Wordle</h1>
      </header>
      <Game/>
      <footer>
        <a href='https://github.com/hsabbas/React-wordle-clone'>
          <img className='github-logo' alt='Github Repo' src={imgUrl}></img>
        </a>
      </footer>
    </>
  )
}

export default App
