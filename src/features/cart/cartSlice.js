import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import cartItems from "../../cartItems";

const initialState = {
  cartItems: cartItems,
  amount: 0,
  total: 0,
  isLoading: false,
};

const url = 'https://www.course-api.com/react-useReducer-cart-project';

export const getCartItems = createAsyncThunk('cart/getCartItems', async () => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch cart items');
    }
    const cartItems = await response.json();
    return cartItems;
  } catch (error) {
    console.error('Error fetching cart items:', error);
    throw error;
  }
});

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCart: (state) => {
      console.log(state.cartItems);
      state.cartItems = [];
    },
    removeItem: (state, action) => {
      const itemId = action.payload;
      state.cartItems = state.cartItems.filter((item) => item.id !== itemId);
    },
    increase: (state, { payload }) => {
      const findItem = state.cartItems.find((item) => item.id === payload);
      if (findItem) {
        findItem.amount += 1;
      }
    },
    decrease: (state, { payload }) => {
      const findItem = state.cartItems.find((item) => item.id === payload);
      if (findItem && findItem.amount > 0) {
        findItem.amount -= 1;
      }
    },
    calculateTotals: (state) => {
      let amount = 0;
      let total = 0;
      state.cartItems.forEach((item) => {
        amount += item.amount;
        total += item.amount * item.price;
      });
      state.amount = amount;
      state.total = total;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCartItems.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCartItems.fulfilled, (state, action) => {
        console.log(action)
        state.isLoading = false;
        state.cartItems = action.payload;
      })
      .addCase(getCartItems.rejected, (state) => {
        state.isLoading = false;
        // Handle rejection if needed
      });
  },
});

export const { clearCart, removeItem, increase, decrease, calculateTotals } = cartSlice.actions;

export default cartSlice.reducer;


