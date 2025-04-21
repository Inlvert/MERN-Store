import { createSlice } from "@reduxjs/toolkit";

const SLICE_NAME = "theme";

const initialState = {
  theme: "light",
};

const themeSlice = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === "light" ? "dark" : "light";
    },
    setTheme: (state, action) => {
      state.theme = action.payload;
    },
  },
});

const { reducer: themeReducer, actions } = themeSlice;

export const { setTheme, toggleTheme } = actions;

export default themeReducer;
