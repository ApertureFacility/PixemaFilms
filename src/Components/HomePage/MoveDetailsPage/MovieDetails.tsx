import React, { useEffect, useCallback, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import './MovieDetals.css'
import SliderList from '../SliderDetails/SliderComp';
import { fetchMovieDetails } from '../../Redux/Actions/Actions';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ThemeContext } from '../../themes/themeContext';
import { useContext } from 'react';

interface MovieDetaills {
  Title: string;
  Year: string;
  imdbID: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Poster: string;
  Ratings: { Source: string; Value: string }[];
  Metascore: string;
  imdbRating: string;
  imdbVotes: string;
  Type: string;
  DVD: string;
  BoxOffice: string;
  Production: string;
  Website: string;
  Response: string;
}

interface AppState {
  movieDetails: MovieDetaills;
}

const MovieDetails = () => {
  const { theme} = useContext(ThemeContext); 
  const dispatch = useDispatch();
  const movieDetails = useSelector((state: AppState) => state.movieDetails);
  
  const { id } = useParams<{ id: string }>();
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (id) {
      dispatch(fetchMovieDetails(id));
      const favorites = JSON.parse(localStorage.getItem('user') || '{}');
      setIsFavorite(!!favorites[id]);
    }
  }, [dispatch, id]);

  const addToFavorites = useCallback(() => {
    if (id) {
      const user = localStorage.getItem('user');
  
      if (!user) {
        toast.error('Вы не вошли в аккаунт!');
        return;
      }
  
      const favorites = JSON.parse(user);
  
      if (isFavorite) {
        delete favorites[id];
        toast.success('Фильм удален из избранного!');
      } else {
        favorites[id] = true;
        toast.success('Фильм добавлен в избранное!');
      }
  
      localStorage.setItem('user', JSON.stringify(favorites));
      setIsFavorite(!isFavorite);
    }
  }, [id, isFavorite]);
  

  if (!movieDetails) {
    return <div>Loading...</div>;
  }
  const getRatingColor = (rating: number) => {
    if (rating <= 5) {
      return 'red';
    } else if (rating <= 7) {
      return 'orange';
    } else {
      return 'green';
    }
  };
  return (
    <div className="movie-details-container"style={{ background: theme.background, color: theme.foreground }}>
      <ToastContainer />
      <div className='container'>
        <div className='movieDetails'>
          <div className='navRight'>
          </div>
          <div className='aboutFilms'>
            <div className="movie-poster-container">
              <img src={movieDetails.Poster} alt={movieDetails.Title} className="movie-poster" />
              <button className='Addtofav' onClick={addToFavorites}style={{ background: theme.background, color: theme.foreground,border:'solid gray' }}>
                {isFavorite ? 'Favorite' : 'Add to favorite'}
              </button>
            </div>
            <div className='infosliderWrap'>
            <div className="movie-info">
              <p className="movie-genre">{movieDetails.Genre}</p>
              <h2 className="movie-title">{movieDetails.Title}</h2>
              <div className='treeGroup'>
              <p className="movie-runtime">{movieDetails.Runtime}</p>
              <p className="movie-imdb-rating" style={{ backgroundColor: getRatingColor(parseFloat(movieDetails.imdbRating)) }}>{movieDetails.imdbRating}</p>
              <p className="movie-metascore">{movieDetails.Metascore}<span className='imbd'>IMBD</span></p>
              </div>
              <p className="movie-plot">{movieDetails.Plot}</p>
              <div className='infoWrapp'>
                <div className='infoNames'>
                <p className="movie-year">Year:</p>
              <p className="movie-released">Released:</p>
              <p className="movie-box-office">Box Office:</p>
              <p className="movie-country">Country: </p>
              <p className="movie-production">Production:</p>
              <p className="movie-actors">Actors:</p>
              <p className="movie-director">Director:</p>
              <p className="movie-writer">Writer: </p>
                </div>
                <div className='infoTTX'>
              <p className="movie-year"> {movieDetails.Year}</p>
              <p className="movie-released"> {movieDetails.Released}</p>
              <p className="movie-box-office"> {movieDetails.BoxOffice}</p>
              <p className="movie-country">{movieDetails.Country}</p>
              <p className="movie-production"> {movieDetails.Production}</p>
              <p className="movie-actors">{movieDetails.Actors}</p>
              <p className="movie-director">{movieDetails.Director}</p>
              <p className="movie-writer">{movieDetails.Writer}</p>
              </div>
              </div>
            </div>
            </div>
          </div>
        </div>  
            <SliderList/>
      </div>
    </div>
  );
};

export default MovieDetails;
