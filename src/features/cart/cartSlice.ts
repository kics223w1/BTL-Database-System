import { createSlice, current } from "@reduxjs/toolkit";
import { Dish } from "../types";

const initialState: any = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      let founded = false;
      state.items = state.items.flatMap((item) => {
        if (action.payload.dish_id === item.item.dish_id) {
          founded = true;
          return {
            ...item,
            quantity: item.quantity + 1,
          };
        }
        return [item];
      });
      if (!founded) {
        state.items.push({
          item: action.payload,
          quantity: 1,
        });
      }

      localStorage.setItem("cart", JSON.stringify(state.items));
    },

    removeFromCart: (state, action) => {
      state.items = state.items.filter(
        (cartItem) => cartItem.item.dish_id !== action.payload.id
      );
      localStorage.setItem("cart", JSON.stringify(state.items));
    },

    increaseItemQuantity: (state, action) => {
      const { id } = action.payload;

      const itemToIncrease = state.items.find(
        (cartItem) => cartItem.item.dish_id === id
      );

      if (itemToIncrease) {
        itemToIncrease.quantity += 1;
        localStorage.setItem("cart", JSON.stringify(state.items));
      }
    },
    decreaseItemQuantity: (state, action) => {
      const { id } = action.payload;
      const itemToDecrease = state.items.find(
        (cartItem) => cartItem.item.dish_id === id
      );

      if (itemToDecrease && itemToDecrease.quantity > 1) {
        itemToDecrease.quantity -= 1;
        localStorage.setItem("cart", JSON.stringify(state.items));
      }
    },
    clearCart: (state) => {
      state.items = [];
      localStorage.removeItem("cart");
    },
  },
});

export const selectItemsInCart = ({ cart }): Dish[] => cart?.items;

export const selectTotalPrice = ({ cart }) => {
  return cart?.items.reduce((total, cartItem) => {
    return total + cartItem.item.itemPrice * cartItem.quantity;
  }, 0);
};

export const {
  addToCart,
  removeFromCart,
  increaseItemQuantity,
  decreaseItemQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
