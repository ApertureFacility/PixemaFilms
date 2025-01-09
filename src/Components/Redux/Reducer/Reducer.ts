import { FETCH_MOVIES, FETCH_MOVIES_SUCCESS, FETCH_MOVIE_DETAILS, FETCH_MOVIE_DETAILS_SUCCESS, FETCH_FAV_MOVIE_DETAILS_SUCCESS, SET_SEARCH_TERM } from "../Actions/Actions";

interface FetchMovieDetailsRequestAction {
  type: typeof FETCH_MOVIE_DETAILS;
}
interface FetchMoviesRequestAction {
  type: typeof FETCH_MOVIES;
  payload: {
    searchTerm: string;
    page: number;
  };
}

interface FetchMovieDetailsSuccessAction {
  type: typeof FETCH_MOVIE_DETAILS_SUCCESS;
  payload: any; 
}

interface FetchMoviesSuccessAction {
  type: typeof FETCH_MOVIES_SUCCESS;
  payload: any;
}

interface FetchFavMovieDetailsSuccessAction {
  type: typeof FETCH_FAV_MOVIE_DETAILS_SUCCESS;
  payload: any; 
}

interface SetSearchTermAction {
  type: typeof SET_SEARCH_TERM;
  payload: string;
}

type FetchMoviesAction = FetchMoviesRequestAction | FetchMoviesSuccessAction | FetchMovieDetailsRequestAction | FetchMovieDetailsSuccessAction | FetchFavMovieDetailsSuccessAction | SetSearchTermAction; // Добавлен новый тип действия

interface Movie {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
}

interface MovieDetails {
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

const initialState = {
  movies: [] as Movie[],
  favMovies: [] as Movie[],
  movieDetails: null as MovieDetails | null,
  searchTerm: '',
  loading: false,
};

export const moviesReducer = (state = initialState, action: FetchMoviesAction) => {
  switch (action.type) {
    case FETCH_MOVIES:
      return { ...state, loading: true }; 
    case FETCH_MOVIES_SUCCESS:
      return { ...state, movies: action.payload, loading: false }; 
    case FETCH_MOVIE_DETAILS_SUCCESS:
      return { ...state, movieDetails: action.payload, loading: false };
    case FETCH_FAV_MOVIE_DETAILS_SUCCESS:
      return { ...state, favMovies: action.payload, loading: false };
    case SET_SEARCH_TERM:
      return { ...state, searchTerm: action.payload };
    default:
      return state;
  }
};

