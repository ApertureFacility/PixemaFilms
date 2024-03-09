import { all, call, put} from 'redux-saga/effects';
import axios from 'axios';
import { fetchMovies, fetchMovieDetails, fetchMovieDetailsSuccess, fetchMoviesSuccess, fetchFavMovieDetailsSuccess } from '../Actions/Actions';

function* fetchMoviesSaga(action: ReturnType<typeof fetchMovies>): Generator<any, void, any> {
  try {
    const { searchTerm, year, genre, page } = action.payload;

    let url = `https://www.omdbapi.com/?s=${searchTerm}&apikey=32f23d10&page=${page}`;

    // Если год введен, добавляем его в URL
    if (year) {
      url += `&y=${year}`;
    }

    // Если жанр введен, добавляем его в URL
    if (genre) {
      url += `&g=${genre}`;
    }

    console.log(url); // Выводим URL в консоль
    const response = yield call(axios.get, url);
    console.log(response);
    yield put(fetchMoviesSuccess(response.data.Search));
  } catch (error) {
    console.error(error);
  }
}



export default fetchMoviesSaga;

export function* fetchMovieDetailsSaga(action: ReturnType<typeof fetchMovieDetails>): Generator<any, void, any> {
  try {
    const response = yield call(
      axios.get,
      `https://www.omdbapi.com/?i=${action.payload}&apikey=32f23d10`
    );
    console.log(response)
    yield put(fetchMovieDetailsSuccess(response.data));
  } catch (error) {
    console.error(error);
  }
}

export function* fetchFavMovieDetailsSaga(): Generator<any, void, any> {
  try {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const movieKeys = Object.keys(user).filter(key => key.startsWith('tt'));

    // Создаем массив промисов для всех запросов к API
    const movieDetailsPromises = movieKeys.map((key: string) =>
      call(axios.get, `https://www.omdbapi.com/?i=${key}&apikey=32f23d10`)
    );

    // Используем 'yield all' для ожидания завершения всех промисов
    const movies = yield all(movieDetailsPromises);

    // Отправляем действие с массивом всех фильмов
    yield put(fetchFavMovieDetailsSuccess(movies.map((response: any) => response.data)));
  } catch (error) {
    console.error(error);
  }
}
