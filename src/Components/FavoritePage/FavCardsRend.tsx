import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchFavMovieDetails } from '../Redux/Actions/Actions';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../themes/themeContext';
import { useContext } from 'react';
import './styles/FavPage.css'; 
import noImg from './Frame 1690.png'

interface Movie {
    imdbID: string;
    Title: string;
    Poster: string;
    Year: string;
    Genre: string; // Добавьте это
    imdbRating: string; // Добавьте это
}
interface RootState {
    favMovies: Movie[];
}

const MovieCards: React.FC = () => {
    const { theme } = useContext(ThemeContext); 
    const dispatch = useDispatch();
    const favMovies = useSelector((state: RootState) => state.favMovies);
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        const movieKeys = Object.keys(user).filter(key => key.startsWith('tt'));
        movieKeys.forEach(key => {
            const value = user[key];
            if (value === true) {
                dispatch(fetchFavMovieDetails(key));
            }
        });
    }, [dispatch]);
    const handleMovieClick = (imdbID: string) => {};

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
        <div className={favMovies.length > 0 ? "movie-container" : "no-movies-container"} style={{ minHeight: '74.8vh' }}>
            {favMovies.length > 0 ? (
                favMovies.map((movie: Movie) => (
                    <Link key={movie.imdbID} to={`/movie/${movie.imdbID}`} onClick={() => handleMovieClick(movie.imdbID)}>
                        <div className="movie-card">
                            <img src={movie.Poster} alt={movie.Title} />
                            <div className='film-card-poster'>
                                <h2 className="favMovText" style={{ background: theme.background, color: theme.foreground }}>{movie.Title}</h2>
                                <p className='film-card__genre'>{movie.Genre}</p>
                                <p className='FAVmovie-imdb-rating' style={{ backgroundColor: getRatingColor(parseFloat(movie.imdbRating)) }}>
                                    {movie.imdbRating}
                                </p>
                            </div>
                        </div>
                    </Link>
                ))
            ) : (
                <div style={{ color: theme.foreground, background: theme.background }}>
                    <img className="no-movies-image" src={noImg} alt="No movies"/>
                </div>
            )}
        </div>
    );
};

export default MovieCards;
