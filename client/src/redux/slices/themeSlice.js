import { createSlice } from "@reduxjs/toolkit";

const SLICE_NAME = "theme";

const getInitialTheme = () => {
  const savedTheme = localStorage.getItem("theme");
  return savedTheme ? savedTheme : "light";
};

const initialState = {
  theme: getInitialTheme(),
};

const themeSlice = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === "light" ? "dark" : "light";
      localStorage.setItem("theme", state.theme);
    },
  },
});

const { reducer: themeReducer, actions } = themeSlice;

export const { toggleTheme } = actions;

export default themeReducer;
