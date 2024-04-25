import { FunctionComponent, useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import pixemLogo from '../img/pixema.png';
import searchSvg from '../img/interfacefilter.svg'
import settSvg from '../img/interfacearrow-down@2x.png'
import { useDispatch } from 'react-redux';
import { fetchMovies, updateSearchTerm } from '../../Redux/Actions/Actions';
import { ThemeContext } from '../../themes/themeContext'; 

const Header: FunctionComponent = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userName, setUserName] = useState("Guest");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const dispatch = useDispatch();

  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      const parsedUser = JSON.parse(user);
      if (parsedUser && parsedUser.name) {
        setUserName(parsedUser.name);
        setIsLoggedIn(true);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    setUserName("Guest");
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    dispatch(fetchMovies(searchTerm));
  };

  const handleLogoClick = () => {
    setSearchTerm("");
    dispatch(updateSearchTerm("new"));
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="container" style={{ background: theme.background, color: theme.foreground }}>
      <header className="header"style={{ background: theme.background, color: theme.foreground }}>
        <div className="Header__wrapper">
          <div className="Header__IconWrapper">
            <div className="header__icon">
              <Link to="/" onClick={handleLogoClick}>
                <img
                  className="header__iconImg"
                  loading="lazy"
                  alt="pixemlogo"
                  src={pixemLogo}
                />
              </Link>
            </div>
            <div className="header__burger-menu" onClick={toggleMenu}></div>
          </div>
          <div className="header__frame">
            <form className="header__search-wrapper" onSubmit={handleSearchSubmit}>
              <div className="header__search-wrapper">
              <input
  className="header__search"
  placeholder="Search"
  type="text"
  value={searchTerm}
  onChange={handleSearchChange}
  style={{ 
    backgroundColor: theme.background, 
    color: theme.foreground, 
    border: theme.border 
  }}/>
                <Link to="/Filters">
                <img
                  className="header__filter-icon"
                  alt="searchFilterIcon"
                  src={searchSvg}
                /></Link>
              </div>
            </form>
          </div>
          <div className="header__group">
            <div className="header__user-group">
              <div className="header__item" />
              <b className="header__user-initials">{userName[0]}</b>
            </div>
            <div className="header__user-name"style={{ background: theme.background, color: theme.foreground }}>{userName}</div>
            <div className="header__user-icon-container" onClick={toggleMenu}>
              <img
                className="header__arrow-down-icon"
                alt="UserSettingIcon"
                src={settSvg}
              />
              {isMenuOpen && (
                <div className="dropdown-menu" style={{ background: theme.background, color: theme.foreground, border: theme.border, borderRadius:'8px'}}>
                {isLoggedIn ? (
                  <Link to="/" onClick={handleLogout} style={{ color: 'white', fontFamily: "'Exo 2', sans-serif" }}>Log Out</Link>
                ) : (
                  <>
                    <Link to="/SignUp" style={{ color: 'white', fontFamily: "'Exo 2', sans-serif" }}>Sign Up</Link>
                    <Link to="/SignIn" style={{ color: 'white', fontFamily: "'Exo 2', sans-serif" }}>Sign In</Link>
                  </>
                )}
              </div>
              
              )}
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
