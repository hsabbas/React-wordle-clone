import './App.css'
import Game from './components/Game'

function App() {
  
  return (
    <>
      <h1 className='heading'>Fake Wordle</h1>
      <Game/>
      <footer>
        <a href='https://github.com/hsabbas?tab=repositories'>
          <img className='github-logo' alt='Github Repo' src='images\github-mark.png'></img>
        </a>
      </footer>
    </>
  )
}

export default App
