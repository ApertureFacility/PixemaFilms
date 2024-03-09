import React, { useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovies } from '../Redux/Actions/Actions';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../themes/themeContext'; // замените на путь к вашему ThemeContext
import './styles/MovieList.css'
import { fetchMovieDetails } from '../Redux/Actions/Actions';

// Определите новый тип для фильма
interface Movie {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
}

// Определите тип для состояния приложения
interface AppState {
  movies: Movie[];
}

const MoviesList = () => {
  const dispatch = useDispatch();
  const movies = useSelector((state: AppState) => state.movies);
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    dispatch(fetchMovies("new")); // "new" будет сохранено как searchTerm в состоянии Redux
  }, [dispatch]);
  

  const handleMovieClick = (imdbID: string) => {
    dispatch(fetchMovieDetails(imdbID));
  };

  return (
    <div className='home-page__film-cards' style={{ background: theme.background, color: theme.foreground }}>
      {movies.map((movie: Movie) => (
        <Link key={movie.imdbID} to={`/movie/${movie.imdbID}`} onClick={() => handleMovieClick(movie.imdbID)}>
          <div className='film-card'>
            <img className='film-card__poster' src={movie.Poster} alt={movie.Title} />
            <h2 className='film-card__title' style={{ color: theme.background === '#eeeeee' ? '#000000' : theme.foreground }}>
              {movie.Title}
            </h2>
          </div>
        </Link>
      ))}
    </div>
  );
};
export default MoviesList;
