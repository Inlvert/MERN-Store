import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {toggleTheme} from "../../redux/slices/themeSlice"

function ThemeToggler() {
  const dispatch = useDispatch();
  const { theme } = useSelector((state) => state.theme);

  return (
    <button onClick={() => dispatch(toggleTheme())}>
      Змінити тему: {theme === "light" ? "🌞" : "🌙"}
    </button>
  );
}

export default ThemeToggler;
