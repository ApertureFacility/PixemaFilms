import { FunctionComponent, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'; 
import { fetchMovies } from '../Redux/Actions/Actions';
import MovieCardXX from "../HomePage/MovieList/FiltredCardsRender";
import closeicon from './Img/interfaceclose.svg'
import 'react-toastify/dist/ReactToastify.css';
import './FiltersPage.css'

const MainMobile: FunctionComponent = () => {
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
    <div className="mainMobile">
      <div className="mobileFrame">
        <img
          className="mobileFrameChild"
          alt=""
          src="/rectangle-320.svg"/>
        <main className="emptyFrame">
          <div className="filterFrame">
            <div className="filters">Filters</div>
            <Link to="/">
            <img
              className="interfacecloseIcon"
              loading="lazy"
              alt=""
              src={closeicon}
            /></Link>
          </div>
          <div className="textFrame">
            <div className="frameInterfaceDelete" />
          </div>
          <section className="movieFrame">
            <div className="genre">Genre</div>
            <div className="countryFrame">
              <select className="countryFrame" value={genre} onChange={(e) => setGenre(e.target.value)}>
                <option value="">Выберите жанр</option>
                <option className="documental">Movie</option>
                <option className="thriller">Series</option>
                <option className="documental">Episode</option>
                <option className="thriller">Game</option>
              </select>
              <div className="countryFrameChild" />
              <div className="sortFrame">
                <div className="adventureInterface1">
                </div>
              </div>
            </div>
          </section>
          <section className="yearsParent">
            <div className="years">Year</div>
            <div className="frameParent">
              <input className="frameChild" placeholder="Type search year here" type="text" value={year} onChange={(e) => setYear(e.target.value)} />
            </div>
          </section>
          <section className="frameX">
            <div className="frameParent">
              <button className="rectangleParent" onClick={handleShowResults}>
                <div className="frameItemShow"><div className="showResults">Show results</div></div>
              </button>
              <Link to="/">
              <button className="rectangleGroup">
                <div className="frameItemRes"><div className="clearFilter">Close filter</div></div>
              </button>
              </Link>
            </div>
          </section>
          <div className="home-page__film-cards">
            {movies.map((movie:any) => <MovieCardXX movie={movie} />)}
            </div>
        </main>
      </div>
    </div>
  );
};

export default MainMobile;
