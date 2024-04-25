import React, { useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovies } from '../../Redux/Actions/Actions';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../../themes/themeContext';
import './MovieList.css'
import { fetchMovieDetails } from '../../Redux/Actions/Actions';
import { useLocation } from "react-router-dom";

// Определите новый тип для фильма
interface Movie {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
  Genre: string;
  imdbRating: string; 
}


interface AppState {
  [x: string]: any;
  movies: Movie[];
}

const MoviesList = () => {
  const dispatch = useDispatch();
  const movies = useSelector((state: AppState) => state.movies);
  const { theme } = useContext(ThemeContext);
  const location = useLocation();
  const searchTerm = useSelector((state: AppState) => state.searchTerm); 

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const page = Number(urlParams.get('page')) || 1;
    const query = searchTerm || "new"; // Если searchTerm пуст, используйте "new"
    dispatch(fetchMovies(query, undefined, undefined, page)); // Используйте query при вызове fetchMovies
  }, [dispatch, location, searchTerm]); // Верните searchTerm в зависимости useEffect
  

  
  const getRatingColor = (rating: number) => {
    if (rating <= 5) {
      return 'red';
    } else if (rating <= 7) {
      return 'orange';
    } else {
      return 'green';
    }
  };

  const handleMovieClick = (imdbID: string) => {
    dispatch(fetchMovieDetails(imdbID));
  };
  const defaultPoster = "https://www.aad.co.uk/img/no-photo.jpg";

  return (
    <div className='home-page__film-cards' style={{ background: theme.background, color: theme.foreground }}>
      {movies.map((movie: Movie) => (
        <Link key={movie.imdbID} to={`/movie/${movie.imdbID}`} onClick={() => handleMovieClick(movie.imdbID)}>
          <div className='film-card'>
            <img className='film-card__poster' src={movie.Poster === "N/A" ? defaultPoster : movie.Poster} alt={movie.Title} />
            <div className='film-card__info'>
              <h2 className='film-card__title' style={{ color: theme.background === '#eeeeee' ? '#000000' : theme.foreground }}>
                {movie.Title}
              </h2>
              <p className='film-card__genre'>{movie.Genre}</p>
            </div>
            <p className='Mmovie-imdb-rating' style={{ backgroundColor: getRatingColor(parseFloat(movie.imdbRating)) }}>
              {movie.imdbRating}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
};
export default MoviesList;
