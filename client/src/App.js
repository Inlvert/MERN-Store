import { Route, Routes } from "react-router";
import style from "./App.module.scss";
import HomePage from "./pages/Home";
import LoginPage from "./pages/Login";
import RegistartionPage from "./pages/Registration";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import CONSTANTS from "./constants";
import { refresh } from "./redux/slices/authSlice";
import AdminPage from "./pages/Admin";
import classNames from "classnames";
import ProductDetailsPage from "./pages/ProductDetails";

function App() {
  const dispatch = useDispatch();
  const { theme } = useSelector((state) => state.theme);

  const backgroundColor = classNames({
    [style.light]: theme === "light",
    [style.dark]: theme === "dark",
  });

  useEffect(() => {
    const refreshTokenFromLS = localStorage.getItem(CONSTANTS.REFRESH_TOKEN);

    if (refreshTokenFromLS) {
      dispatch(refresh(refreshTokenFromLS));
    }
  }, []);
  return (
    <div className="App">
      <header className={backgroundColor}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/registration" element={<RegistartionPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/products/:productId" element={<ProductDetailsPage />} />
        </Routes>
      </header>
    </div>
  );
}

export default App;
