import React, { useState, useEffect } from 'react'
import Search from './components/Search'
import Spinner from './components/Spinner';
import MovieCard from './components/MovieCard';
import { useDebounce } from 'react-use';
import { getTrendingMovies, updateSearchCount } from './appwrite';

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
  const [errorMessageTrend, setErrorMessageTrend] = useState("");
  const [movieData, setMovieData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingTrend, setIsLoadingTrend] = useState(false);
  const [debouncedSearchText, setDebouncedSearchText] = useState('');
  const [trendingMovies, setTrendingMovies] = useState([]);

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
      if (query && data.results.length > 0) {
        await updateSearchCount(query, data.results[0]);
      }
    } catch (error) {
      console.error(`Error fetching movies ${error}`);
      setErrorMessage(`Error fetching movies ${error}`);
    }
    finally {
      setIsLoading(false);
    }
  }
  const fetchTrendingMovies = async () => {
    setIsLoadingTrend(true);
    setErrorMessage('');
    try {
      const movies = await getTrendingMovies();
      setTrendingMovies(movies);

    } catch (error) {
      console.error(`Error fetching trends ${error}`);
      setErrorMessageTrend(`${error}`);
    } finally {
      setIsLoadingTrend(false);
    }
  }
  useEffect(() => {
    fetchMovies(debouncedSearchText);
  }, [debouncedSearchText]);

  useEffect(() => {
    fetchTrendingMovies();
  }, [])


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

        {isLoadingTrend ? (<Spinner></Spinner>) : errorMessageTrend ? (
          <p className='text-red-500'> {errorMessageTrend}</p>
        ) : trendingMovies.length > 0 ? (
          <section className='trending'>
            <h2>
              Trending Movies
            </h2>
            <ul>
              {trendingMovies.map((movie, index) => (
                <li key={movie.$id}>
                  <p>{index + 1}</p>
                  <img src={movie.poster_url} alt={movie.title}></img>
                </li>
              ))}
            </ul>
          </section>
        ) : (
          <p>No trending movies found.</p>
        )}

        <section className='all-movies'>
          <h2 >All Movies</h2>
          {isLoading ? (
            <Spinner></Spinner>
          ) : errorMessage ? (
            <p className='text-red-500'> {errorMessage}</p>
          ) : (
            <ul>
              {movieData.map((movie) => (
                <MovieCard key={movie.id} movie={movie}></MovieCard>
              ))}
            </ul>
          )}
        </section>

      </div>
    </main>
  )
}

export default App