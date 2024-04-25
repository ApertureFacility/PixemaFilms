import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchMovieDetails } from '../Redux/Actions/Actions';

const CheckLocalStorage: React.FC = () => {
  const dispatch = useDispatch();
  useEffect(() => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');

    //  ключи объекта user, которые начинаются с 'tt'
    const movieKeys = Object.keys(user).filter(key => key.startsWith('tt'));

    // Для каждого ключа проверяем значение. Если true, то вызываем сагу
    movieKeys.forEach(key => {
      const value = user[key];
      if (value === true) {
        console.log(`Key: ${key}, Value: ${value}`); // Выводим ключ и значение в консоль
        dispatch(fetchMovieDetails(key));
      }
    });
  }, [dispatch]);

  return null;
};

export default CheckLocalStorage;
