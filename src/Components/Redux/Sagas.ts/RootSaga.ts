import { takeLatest, all } from 'redux-saga/effects';
import { FETCH_MOVIES, FETCH_MOVIE_DETAILS, FETCH_FAV_MOVIE_DETAILS } from "../Actions/Actions";
import fetchMoviesSaga, { fetchMovieDetailsSaga, fetchFavMovieDetailsSaga } from "./Sagas";

function* watchFetchMovies() {
  yield takeLatest(FETCH_MOVIES, fetchMoviesSaga);
}

function* watchFetchMovieDetails() {
  yield takeLatest(FETCH_MOVIE_DETAILS, fetchMovieDetailsSaga);
}

function* watchFetchFavMovieDetails() {
  yield takeLatest(FETCH_FAV_MOVIE_DETAILS, fetchFavMovieDetailsSaga);
}

export function* rootSaga() {
  yield all([watchFetchMovies(), watchFetchMovieDetails(), watchFetchFavMovieDetails()]);
}
