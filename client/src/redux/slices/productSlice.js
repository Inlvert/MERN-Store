import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as API from "../../api";

const SLICE_NAME = "products";

const initialState = {
  products: [],
  product: null,
  isLoading: false,
  totalPages: 0,
  currentPage: 1,
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

const getProducts = createAsyncThunk(
  `${SLICE_NAME}/getProducts`,
  async (page, thunkAPI) => {
    try {
      const response = await API.getProducts(page);

      const { data, totalPages, currentPage } = response;

      return { data, totalPages, currentPage };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.data.errors);
    }
  }
);

const getProduct = createAsyncThunk(
  `${SLICE_NAME}/getProduct`,
  async (productId, thunkAPI) => {
    try {
      const response = await API.getProduct(productId);

      const {
        data: { data: product },
      } = response;

      return product;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.data.errors);
    }
  }
);

const productSlice = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {
    nextPage: (state) => {
      state.currentPage = +state.currentPage + 1;
    },
    prevPage: (state) => {
      state.currentPage = +state.currentPage - 1;
    },
    setPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
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

    builder.addCase(getProducts.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getProducts.fulfilled, (state, action) => {
      const { data, totalPages, currentPage } = action.payload;
      state.isLoading = false;
      state.products = data;
      state.totalPages = totalPages;
      state.currentPage = currentPage;
    });
    builder.addCase(getProducts.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    builder.addCase(getProduct.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getProduct.fulfilled, (state, action) => {
      state.isLoading = false;
      state.product = action.payload;
    });
    builder.addCase(getProduct.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

const { reducer: productReducer, actions } = productSlice;

export const { nextPage, prevPage, setPage } = actions;

export { createProduct, getProducts, getProduct };

export default productReducer;
