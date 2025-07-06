import { createSlice } from "@reduxjs/toolkit";

const cart = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : {};
const initialState = {
  cartItems: cart.cartItems || [],
  itemsCount: cart.itemsCount || 0,
  cartSubtotal: cart.cartSubtotal || 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, actions) => {
      const newItem = actions.payload;
      const existingItem = state.cartItems.find(
        (item) => item.productId === newItem.productId
      );
      if (existingItem) {
        state.cartItems.forEach((item) => {
          if (item.productId === newItem.productId) {
            item.quantity += +newItem.quantity;
            const sum = +newItem.quantity * +newItem.price;
            state.cartSubtotal += sum;
          }
        });
      } else {
        state.cartItems = [...state.cartItems, newItem];
        const sum = +newItem.quantity * +newItem.price;
        state.cartSubtotal += sum;
        state.itemsCount++;
      }
      localStorage.setItem("cart", JSON.stringify(state));
    },
    updateCartItem: (state, action) => {
      const { productId, price, quantity } = action.payload;
      const existingItem = state.cartItems.find(
        (item) => item.productId === productId
      );
      if (existingItem) {
        const previousQuantity = existingItem.quantity;
        existingItem.quantity = quantity;
        state.cartSubtotal -= previousQuantity * +price;
        state.cartSubtotal += quantity * +price;
      }
      localStorage.setItem("cart", JSON.stringify(state));
    },
    removeFromCart: (state, action) => {
      const { productId, price, quantity } = action.payload;
      state.cartItems = state.cartItems.filter(
        (item) => item.productId !== productId
      );
      state.itemsCount--;
      state.cartSubtotal -= +price * +quantity;
      localStorage.setItem("cart", JSON.stringify(state));
    },
    completeOrder: (state, action) => {
      state.cartItems = [];
      state.itemsCount = 0;
      state.cartSubtotal = 0;
      localStorage.removeItem("cart");
    },
  },
});

export const { addToCart, removeFromCart, updateCartItem, completeOrder } =
  cartSlice.actions;

export default cartSlice.reducer;
