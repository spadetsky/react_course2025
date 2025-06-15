import React, { useState, useEffect } from 'react'
import Search from './components/Search'
import Spinner from './components/Spinner';
import MovieCard from './components/MovieCard';
import { useDebounce } from 'react-use';

const API_BASE_URL = "https://api.themoviedb.org/3";


const API_KEY = import.meta.env.VITE_TMBD_API_KEY;

const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`
  }
}

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [movieData, setMovieData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [debouncedSearchText, setDebouncedSearchText] = useState('');

  useDebounce(() => setDebouncedSearchText(searchTerm), 1000, [searchTerm]);

  const fetchMovies = async (query = '') => {
    setIsLoading(true);
    setErrorMessage('');
    try {
      const endpoint = query ? `${API_BASE_URL}/search/movie?query=${encodeURI(query)}` : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;
      const response = await fetch(endpoint, API_OPTIONS);
      if (!response.ok) {
        throw new Error(`Failed to fetch movies`);
      }
      const data = await response.json();
      if (data.Response == `False`) {
        setErrorMessage(data.Error || `Failed to fetch movie data`);
        setMovieData([]);
        return;
      }

      setMovieData(data.results || []);

    } catch (error) {
      console.error(`Error fetching movies ${error}`);
      setErrorMessage(`Error fetching movies ${error}`);
    }
    finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchMovies(debouncedSearchText);
  }, [debouncedSearchText]);

  return (
    <main>
      <div className='pattern' />
      <div className='wrapper'>
        <header>
          <img src='./hero-img.png' alt='Hero Banner'></img>
          <h1>
            <span className='text-gradient'>Movies</span> Youl enjoy without something
          </h1>
          <p>Search</p>
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm}></Search>
        </header>
        <section className='all-movies'>
          <h2 className='mt-[40px]'>All Movies</h2>
          {isLoading ? (
            <Spinner></Spinner>
          ) : errorMessage ? (
            <p className='text-red-500'> {errorMessage}</p>
          ) : (
            <ul>
              {movieData.map((movie) => (
                <MovieCard movieKey={movie.id} movie={movie}></MovieCard>
              ))}
            </ul>
          )}
        </section>

      </div>
    </main>
  )
}

export default App