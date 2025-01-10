import {
  BrowserRouter as Router,
  Route,
  Routes,
  Outlet,
} from "react-router-dom";
import { Provider } from "react-redux";
import { ThemeContext, ThemeProvider } from "./Components/themes/themeContext";
import { useContext, useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import HomePage from "./Components/HomePage/MainPage/HomePage";
import store from "./Components/Redux/Store/Store";
import MovieDetails from "./Components/HomePage/MoveDetailsPage/MovieDetails";
import FavoritePage from "./Components/Favorite/FavoritePage";
import Navbar from "./Components/HomePage/RightNavBar/NavigationRight";
import Header from "./Components/HomePage/Header/Header";
import SignInForm from "./Components/LogInPage/LoginPage";
import SettingsFrame from "./Components/SettingsComponent/SettingsComp";
import RegPage from "./Components/RegistrationPage/RegPage";
import FilterComp from "./Components/FiltersPage/FiltersPage";
import "./App.css";

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <Router>
          <Routes>
            <Route path="/SignUp" element={<RegPage />} />
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
      <div
        className="ContentBlock"
        style={{ display: "flex", backgroundColor: bgColor }}
      >
        <Navbar />
        <Routes>
          <Route path="/Filters" element={<FilterComp />} />
          <Route path="/Settings" element={<SettingsFrame />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
          <Route path="/" element={<Outlet />}>
            <Route index element={<HomePage />} />
            <Route path="/Favorites" element={<FavoritePage />} />
          </Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
