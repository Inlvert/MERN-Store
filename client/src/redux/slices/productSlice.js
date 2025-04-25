import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as API from "../../api";

const SLICE_NAME = "products";

const initialState = {
  products: [],
  isLoading: false,
  error: null,
};

const createProduct = createAsyncThunk(
  `${SLICE_NAME}/create`,
  async (productData, thunkAPI) => {
    try {
      const response = await API.createProduct(productData);

      const {
        data: { data: product },
      } = response;

      console.log(product);

      return product;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.data.errors);
    }
  }
);

const productSlice = createSlice({
  name: SLICE_NAME,
  initialState,
  extraReducers: (builder) => {
    builder.addCase(createProduct.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(createProduct.fulfilled, (state, action) => {
      state.isLoading = false;
      state.products.push(action.payload);
    });
    builder.addCase(createProduct.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

const { reducer: productReducer, actions } = productSlice;

export { createProduct };

export default productReducer;
