import './App.css';
import { useEffect, useState } from 'react';
import {Link, Route, Routes} from "react-router-dom"
import AllMovies from './pages/AllMovies';
import SingleMovie from './pages/SingleMovie'

function App() {
  const url = "https://mc-movie-app.herokuapp.com/"
  const [movies, setMovies] = useState([])

  const getMovies = async () => {
    const response = await fetch(`${url}movies/`);
    const data = await response.json()
    setMovies(data)
  }
  useEffect(() => {
    getMovies()
  }, [])
  return (
    <div className="App">
      <Link to="/" className="logo"><h1>movie box</h1></Link>
      <Routes>
        <Route path="/" element={<AllMovies movies={movies}/>} />
        <Route path="/:id" element={<SingleMovie movies={movies}/>} />
      </Routes>
    </div>
  );
}

export default App;
