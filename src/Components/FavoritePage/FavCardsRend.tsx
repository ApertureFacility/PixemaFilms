import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchFavMovieDetails } from '../Redux/Actions/Actions';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../themes/themeContext';
import { useContext } from 'react';
import './styles/FavPage.css'; 


interface Movie {
    imdbID: string;
    Title: string;
    Poster: string;
    Year: string;
}
interface RootState {
    favMovies: Movie[];
}

const MovieCards: React.FC = () => {
    const { theme} = useContext(ThemeContext); 
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

    return (
        <div className="movie-container">
            {favMovies.map((movie: Movie) => (
                <Link key={movie.imdbID} to={`/movie/${movie.imdbID}`} onClick={() => handleMovieClick(movie.imdbID)}>
                    <div className="movie-card">
                        <img src={movie.Poster} alt={movie.Title} />
                        <h2 className="favMovText"style={{ background: theme.background, color: theme.foreground }}>{movie.Title}</h2>
                    </div>
                </Link>
            ))}
        </div>
    );
};

export default MovieCards;
