import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import productReducer from './productSlice';
import favoriteReducer from './favoriteSlice';

const store = configureStore({
  reducer: {
    cart: cartReducer,
    products: productReducer,
    favorites: favoriteReducer,
  },
});

export default store;
