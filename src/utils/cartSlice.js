import { createSlice } from "@reduxjs/toolkit";
import { calculateTotalPrice } from "./helper";

const initialState = {
  cart: [],
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      const itemIndex = state.cart.findIndex(
        (item) => item.card.info.id === action.payload.card.info.id
      );
      if (itemIndex === -1) {
        state.cart.push({ ...action.payload, quantity: 1 });
      }
      state.totalPrice = calculateTotalPrice(state.cart);
    },

    incrementItemQuantity: (state, action) => {
      const item = state.cart.find(
        (item) => item.card.info.id === action.payload
      );
      if (item) {
        item.quantity += 1;
      }
      state.totalPrice = calculateTotalPrice(state.cart);
    },

    decrementItemQuantity: (state, action) => {
      const item = state.cart.find(
        (item) => item.card.info.id === action.payload
      );
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      } else {
        state.cart = state.cart.filter(
          (item) => item.card.info.id !== action.payload
        );
      }
      state.totalPrice = calculateTotalPrice(state.cart);
    },

    deleteItem: (state, action) => {
      state.cart = state.cart.filter(
        (item) => item.card.info.id !== action.payload
      );
      state.totalPrice = calculateTotalPrice(state.cart);
    },

    clearCart: (state) => {
      state.cart.length = 0;
      state.totalPrice = 0;
    },
  },
});

export const {
  addItem,
  incrementItemQuantity,
  decrementItemQuantity,
  deleteItem,
  clearCart,
} = cartSlice.actions;

// Selector to get total count of items in cart
export const selectCartCount = (state) =>
  state.cart.cart.reduce((total, item) => total + item.quantity, 0);

// Selector to get total amount of items in cart
export const selectTotalPrice = (state) => state.cart.totalPrice;

export default cartSlice.reducer;
