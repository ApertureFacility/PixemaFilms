import React from 'react';
import CheckLocalStorage from './FavoriteFetcher';
import MovieCards from './FavoriteCardsRenderer';
import './styles/FavoritePage.css'



const FavoritePage: React.FC = () => {
  return (
    <div className='EmptyFavBlock'>
      <CheckLocalStorage />
      <MovieCards/>
    </div>
  );
};

export default FavoritePage;
