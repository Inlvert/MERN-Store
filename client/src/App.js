import { Route, Routes } from "react-router";
import "./App.css";
import HomePage from "./pages/Home";
import LoginPage from "./pages/Login";
import RegistartionPage from "./pages/Registration";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import CONSTANTS from "./constants";
import { refresh } from "./redux/slices/authSlice";
import AdminPage from "./pages/Admin";

function App() {
  const dispatch = useDispatch();
  
  useEffect(() => {

    const refreshTokenFromLS = localStorage.getItem(CONSTANTS.REFRESH_TOKEN);

    if (refreshTokenFromLS) {
      dispatch(refresh(refreshTokenFromLS));
    }
  }, []);
  return (
    <div className="App">
      <header className="App-header">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/registration" element={<RegistartionPage />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </header>
    </div>
  );
}

export default App;
