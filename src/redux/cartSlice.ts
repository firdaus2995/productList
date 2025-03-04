import {createSlice} from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {items: []},
  reducers: {
    addToCart: (state: any, action) => {
      const existingItem = state.items.find(
        (item: {id: any}) => item.id === action.payload.id,
      );
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({...action.payload, quantity: 1});
      }
    },
    removeFromCart: (state: any, action) => {
      state.items = state.items.filter(
        (item: {id: any}) => item.id !== action.payload,
      );
    },
    updateQuantity: (state: any, action) => {
      const item = state.items.find(
        (i: {id: any}) => i.id === action.payload.id,
      );
      if (item) {
        item.quantity += action.payload.amount;
        if (item.quantity <= 0) {
          state.items = state.items.filter((i: {id: any}) => i.id !== item.id);
        }
      }
    },
  },
});

export const {addToCart, removeFromCart, updateQuantity} = cartSlice.actions;
export default cartSlice.reducer;
