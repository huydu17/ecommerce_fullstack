import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./slices/cartSlice";
import userReducer from "./slices/userSlice";
import categoryReducer from "./slices/categorySlice";
export const store = configureStore({
  reducer: {
    cart: cartReducer,
    user: userReducer,
    category: categoryReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});
