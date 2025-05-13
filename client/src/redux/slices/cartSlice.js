import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as API from "../../api";

const SLICE_NAME = "carts";

let initialState = {
  cart: {
    CartProducts: [],
  },
  totalPrice: 0,
  isLoading: false,
  error: null,
};

// const getCart = createAsyncThunk(
//   `${SLICE_NAME}/getCartProducts`,
//   async (cartId, thunkAPI) => {
//     try {
//       const response = await API.getCart(cartId);

//       const { cart, totalPrice } = response;

//       return { cart, totalPrice };
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.response.data.data.errors);
//     }
//   }
// );

const getCart = createAsyncThunk(
  `${SLICE_NAME}/getCartProducts`,
  async (cartData, thunkAPI) => {
    console.log(cartData);
    try {
      const response = await API.getCart(cartData);

      const {
        data: { data: cart, totalPrice },
      } = response;

      return { cart, totalPrice };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.data.errors);
    }
  }
);

const cartSlice = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {
    clearCart: (state) => {
      state.totalPrice = 0;
      state.cartProducts = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCart.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getCart.fulfilled, (state, action) => {
      state.isLoading = false;
      state.cart = action.payload.cart;
      state.totalPrice = action.payload.totalPrice;
    });
    builder.addCase(getCart.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

const { reducer: cartReducer, actions } = cartSlice;

export const { clearCart } = actions;

export { getCart };

export default cartReducer;
