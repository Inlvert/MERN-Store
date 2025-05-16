import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as API from "../../api";

const SLICE_NAME = "cart-products";

let initialState = {
  products: [],
  isLoading: false,
  error: null,
};

const updateQuantity = createAsyncThunk(
  `${SLICE_NAME}/update`,
  async ({ cartProductId, quantity }, thunkAPI) => {
    try {
      const response = await API.updateQuantityProduct(cartProductId, quantity);

      const {
        data: {
          data: { updatedCartProduct },
        },
      } = response;

      return updatedCartProduct;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.data.errors);
    }
  }
);

const deleteProductFromCart = createAsyncThunk(
  `${SLICE_NAME}/deleteProductFromCart`,
  async (cartProductId, thunkAPI) => {
    try {
      const response = await API.deleteProductFromCart(cartProductId);

      const {
        data: {
          data: { deleteProduct },
        },
      } = response;

      return deleteProduct;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.data.errors);
    }
  }
);

const cartProductSlice = createSlice({
  name: SLICE_NAME,
  initialState,
  extraReducers: (builder) => {
    builder.addCase(updateQuantity.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateQuantity.fulfilled, (state, action) => {
      state.isLoading = false;
      const index = state.products.findIndex(
        (product) => product._id === action.payload._id
      );
      if (index !== -1) {
        state.products[index] = action.payload;
      }
    });
    builder.addCase(updateQuantity.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    builder.addCase(deleteProductFromCart.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteProductFromCart.fulfilled, (state, action) => {
      state.isLoading = false;
      state.products = state.products.filter(
        (product) => product._id !== action.payload._id
      );
    });
    builder.addCase(deleteProductFromCart.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })
  },
});

const { reducer: cartProductReducer, actions } = cartProductSlice;

export { updateQuantity, deleteProductFromCart };

export default cartProductReducer;
