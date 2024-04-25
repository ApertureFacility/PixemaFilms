import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import homeIcon from '../img/home.svg';
import settingsIcon from '../img/settings.svg';
import favoritesIcon from '../img/favorites.svg';
import { ThemeContext } from '../../themes/themeContext';
import { useDispatch } from 'react-redux';
import { updateSearchTerm } from '../../Redux/Actions/Actions';

const NavigationRight = () => {
  const { theme } = useContext(ThemeContext);
  const dispatch = useDispatch();

  const handleHomeClick = () => {
    dispatch(updateSearchTerm("new"));
  };
  return (
    <div className='home-page__nav' style={{ background: theme.background, color: theme.foreground,padding:'20px' }}>
      <Link to="/" className='home-page__nav-button' onClick={handleHomeClick}>
        <img src={homeIcon} alt='home'/> Home
      </Link>
      <Link to="/Favorites" className='home-page__nav-button'>
        <img src={favoritesIcon} alt='favorites'/> Favorites
      </Link>
      <Link to="/Settings" className='home-page__nav-button'>
        <img src={settingsIcon} alt='settings'/> Settings
      </Link>
    </div>
  );
};

export default NavigationRight;
