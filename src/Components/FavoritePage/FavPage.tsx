import React from 'react';
import './styles/FavPage.css'
import CheckLocalStorage from './FavGet';
import MovieCards from './FavCardsRend';



const FavPage: React.FC = () => {
  return (
    <div className='NoFavImg'>
      <CheckLocalStorage />
      <MovieCards/>
    </div>
  );
};

export default FavPage;
