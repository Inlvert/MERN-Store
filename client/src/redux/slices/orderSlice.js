import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as API from "../../api";

const SLICE_NAME = "orders";

let initialState = {
  products: [],
  orders: [],
  totalPrice: 0,
  isLoading: false,
  error: null,
};

const createOrder = createAsyncThunk(
  `${SLICE_NAME}/createOrder`,
  async (orderData, thunkAPI) => {
    try {
      const response = await API.createOrder(orderData);

      const {
        data: { data: order },
      } = response;

      console.log(order);

      return order;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.data.errors);
    }
  }
);

const getAllUserOrders = createAsyncThunk(
  `${SLICE_NAME}/getAllUserOrders`,
  async (_, thunkAPI) => {
    try {
      const response = await API.getAllUserOrders();
      const {
        data: { data: orders },
      } = response;

      console.log(orders);

      return orders;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.data.errors);
    }
  }
);

const orderSlice = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {
    clearCart: (state) => {
      state.totalPrice = 0;
      state.products = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createOrder.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(createOrder.fulfilled, (state, action) => {
      state.isLoading = false;
      state.totalPrice = action.payload.totalPrice;
      state.products.push(action.payload);
    });
    builder.addCase(createOrder.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    builder.addCase(getAllUserOrders.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getAllUserOrders.fulfilled, (state, action) => {
      state.isLoading = false;
      state.orders = action.payload;
    });
    builder.addCase(getAllUserOrders.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

const { reducer: orderReducer, actions } = orderSlice;

// export const { clearCart } = actions;

export { createOrder, getAllUserOrders };

export default orderReducer;
