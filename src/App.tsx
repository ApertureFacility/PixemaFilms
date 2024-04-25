import { BrowserRouter as Router, Route, Routes, Outlet } from "react-router-dom";
import HomePage from './Components/HomePage/MainPage/HomePage';
import { Provider } from 'react-redux';
import store from './Components/Redux/Store/Store';
import MovieDetails from './Components/HomePage/MoveDetailsPage/MovieDetails';
import FavPage from './Components/FavoritePage/FavPage';
import Navbar from './Components/HomePage/RightNavBar/NavigationRight';
import Header from './Components/HomePage/Header/Header';
import SignInForm from './Components/LogInPage/LoginPage';
import SettingsFrame from './Components/SettingsComponent/SettingsComp';
import RegPage from './Components/RegistrationPage/RegPage';
import FilterComp from './Components/FiltersPage/FiltersPage';
import { ThemeContext, ThemeProvider } from './Components/themes/themeContext'; 
import  { useContext, useState, useEffect } from 'react'; 
import './App.css';


import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider> 
        <Router>
          <Routes>
            <Route path="/SignUp" element={<RegPage/>}/>
            <Route path="/SignIn" element={<SignInForm />} /> 
            <Route path="/*" element={<Layout />} />
          </Routes>
        </Router>
        <ToastContainer />
      </ThemeProvider>
    </Provider>
  );
}


function Layout() {
  const { theme } = useContext(ThemeContext); 
  const [bgColor, setBgColor] = useState(theme.background); 
  useEffect(() => {
    setBgColor(theme.background);
  }, [theme]);


  return (
    <>
      <Header />
      <div className="WPPX" style={{ display: 'flex', backgroundColor: bgColor }}> 
        <Navbar  />
        <Routes>
          <Route path='/Filters'element={<FilterComp/>}/>
          <Route path='/Settings' element={<SettingsFrame/>}/>
          <Route path="/movie/:id" element={<MovieDetails />} />
          <Route path="/" element={<Outlet />}>
            <Route index element={<HomePage />} />
            <Route path='/Favorites' element={<FavPage />} />
          </Route>
        </Routes>
      </div>
    </>
  );
}

export default App;