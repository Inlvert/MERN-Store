import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as API from "../../api";

const SLICE_NAME = "auth";

const initialState = {
  user: null,
  isLoading: false,
  error: null,
  isAuthenticated: false,
};

const login = createAsyncThunk(
  `${SLICE_NAME}/login`,
  async (userData, thunkAPI) => {
    try {
      const {
        data: {
          data: { user },
        },
      } = await API.login(userData);

      return user;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.data.errors);
    }
  }
);

const authSlice = createSlice({
  name: SLICE_NAME,
  initialState,
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
      state.isAuthenticated = true;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

const { reducer: authReducer, actions } = authSlice;

export {login}

export default authReducer;
