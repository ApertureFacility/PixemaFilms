import { FunctionComponent, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'; 
import { fetchMovies } from '../Redux/Actions/Actions';
import MovieCardXX from "../HomePage/MovieList/FiltredCardsRender";
import closeicon from './Img/interfaceclose.svg'
import 'react-toastify/dist/ReactToastify.css';
import './FiltersPage.css'

const FiltersPage: FunctionComponent = () => {
  const dispatch = useDispatch();
  const searchTerm = useSelector((state:any) => state.searchTerm); 
  const movies = useSelector((state:any) => state.movies); 
  const [genre, setGenre] = useState("");
  const [year, setYear] = useState("");
  const [prevGenre, setPrevGenre] = useState("");
  const [prevYear, setPrevYear] = useState("");

  const handleShowResults = () => {
    if (genre !== prevGenre) {
      setPrevGenre(genre);
    }
    if (year !== prevYear) {
      setPrevYear(year);
    }
    if (genre && year) {
      dispatch(fetchMovies(searchTerm, year, genre)); 
    }
  };

  return (
    <div className="filters-page__background">
      <div className="filters-page__mobile-frame">
        <img
          className="filters-page__background-image"
          alt=""
          src="/rectangle-320.svg"/>
        <main className="filters-page__content">
          <div className="filters-page__header">
            <div className="filters-page__title">Filters</div>
            <Link to="/">
              <img
                className="filters-page__close-icon"
                loading="lazy"
                alt="Close"
                src={closeicon}
              />
            </Link>
          </div>

          <section className="filters-page__genre-section">
            <div className="filters-page__label">Genre</div>
            <div className="filters-page__genre-select-wrapper">
              <select 
                className="filters-page__genre-select"
                value={genre} 
                onChange={(e) => setGenre(e.target.value)}
              >
                <option value="">Select genre</option>
                <option className="filters-page__option" value="movie">Movie</option>
                <option className="filters-page__option" value="series">Series</option>
                <option className="filters-page__option" value="episode">Episode</option>
                <option className="filters-page__option" value="game">Game</option>
              </select>
            </div>
          </section>

          <section className="filters-page__year-section">
            <div className="filters-page__label">Year</div>
            <div className="filters-page__year-input-wrapper">
              <input 
                className="filters-page__year-input" 
                placeholder="Type search year here" 
                type="text" 
                value={year} 
                onChange={(e) => setYear(e.target.value)} 
              />
            </div>
          </section>

          <section className="filters-page__actions">
            <div className="filters-page__buttons">
              <button className="filters-page__show-results-button" onClick={handleShowResults}>
                <div className="filters-page__button-text">Show results</div>
              </button>
              <Link to="/">
                <button className="filters-page__clear-filters-button">
                  <div className="filters-page__button-text">Close filter</div>
                </button>
              </Link>
            </div>
          </section>

          <div className="filters-page__movie-cards">
            {movies.map((movie:any) => <MovieCardXX movie={movie} />)}
          </div>
        </main>
      </div>
    </div>
  );
};

export default FiltersPage;
