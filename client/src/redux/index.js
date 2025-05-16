import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import themeReducer from "./slices/themeSlice";
import productReducer from "./slices/productSlice";
import cartReducer from "./slices/cartSlice";
import cartProductReducer from "./slices/cartProductSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    theme: themeReducer,
    product: productReducer,
    cart: cartReducer,
    cartProduct: cartProductReducer,
  },
});

export default store;
