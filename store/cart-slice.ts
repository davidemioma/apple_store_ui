import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItem } from "../types";
import { RoofState } from "./store";

interface Props {
  cart: CartItem[];
}

const CartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [],
  },
  reducers: {
    addToCart(state: Props, action: PayloadAction<CartItem>) {
      const newItem = action.payload;

      const existingItem = state.cart.find((item) => item._id === newItem._id);

      if (!existingItem) {
        state.cart.unshift(newItem);
      } else {
        existingItem.quantity++;
      }
    },

    removeFromCart(state: Props, action: PayloadAction<string>) {
      const id = action.payload;

      const existingItem = state.cart.find((item) => item._id === id);

      if (existingItem) {
        if (existingItem.quantity === 1) {
          state.cart = state.cart.filter((item) => item._id !== id);
        } else {
          existingItem.quantity--;
        }
      }
    },
  },
});

export const cartSelector = (state: RoofState) => state.cart.cart;

export const totalAmount = (state: RoofState) =>
  state.cart.cart.reduce(
    (total: number, item: CartItem) => total + item.price * item.quantity,
    0
  );

export default CartSlice;
