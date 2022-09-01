import { configureStore } from "@reduxjs/toolkit";
import CartSlice from "./cart-slice";

const store = configureStore({
  reducer: { cart: CartSlice.reducer },
});

export const { addToCart, removeFromCart } = CartSlice.actions;

export type RoofState = ReturnType<typeof store.getState>;

export default store;
