import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovies } from '../../Redux/Actions/Actions';
import { Link } from 'react-router-dom';
import './SliderCompStyles.css';
import { fetchMovieDetails } from '../../Redux/Actions/Actions';
import { ThemeContext } from '../../themes/themeContext'; // Импортируйте ThemeContext
import { useContext } from 'react';

interface Movie {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
}

interface AppState {
  movies: Movie[];
}

const SliderList = () => {
  
  const { theme} = useContext(ThemeContext);
  const dispatch = useDispatch();
  const movies = useSelector((state: AppState) => state.movies);
  const [startIndex, setStartIndex] = useState(0);

  useEffect(() => {
    dispatch(fetchMovies("star"));
  }, [dispatch]);

  const handleMovieClick = (imdbID: string) => {
    dispatch(fetchMovieDetails(imdbID));
  };

  const handleNextClick = () => {
    setStartIndex((startIndex + 5) % movies.length);
  };

  const handlePrevClick = () => {
    setStartIndex((startIndex - 5 + movies.length) % movies.length);
  };

  return (
    <div className='slideWrapp'>
        <div className='rec'>
        <p className='recText'>Recomendations <button onClick={handlePrevClick}>←</button><button onClick={handleNextClick}>→</button></p></div>
    <div className='new-home-page__film-cards'>
      <div className='new-home-page__film-cards__arrows'>

      </div>
      {movies.slice(startIndex, startIndex + 5).map((movie: Movie) => (
        <Link key={movie.imdbID} to={`/movie/${movie.imdbID}`} onClick={() => handleMovieClick(movie.imdbID)}>
          <div className='new-film-card'>
            <img className='new-film-card__poster' src={movie.Poster} alt={movie.Title} />
            <h2 className='new-film-card__title'style={{ background: theme.background, color: theme.foreground }}>{movie.Title}</h2>
          </div>
        </Link>
      ))}
    </div>
    </div>
  );
};

export default SliderList;
