import { Route, Routes } from "react-router";
import "./App.css";
import HomePage from "./pages/Home";
import LoginPage from "./pages/Login";
import RegistartionPage from "./pages/Registration";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/registration" element={<RegistartionPage />} />
        </Routes>
      </header>
    </div>
  );
}

export default App;
