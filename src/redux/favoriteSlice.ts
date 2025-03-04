import { createSlice } from '@reduxjs/toolkit';

const favoriteSlice = createSlice({
  name: 'favorites',
  initialState: {
    items: [],
  },
  reducers: {
    addFavorite: (state: any, action) => {
      if (!state.items.some((item: { id: any; }) => item.id === action.payload.id)) {
        state.items.push(action.payload);
      }
    },
    removeFavorite: (state: any, action) => {
      state.items = state.items.filter((item: { id: any; }) => item.id !== action.payload);
    },
  },
});

export const { addFavorite, removeFavorite } = favoriteSlice.actions;
export default favoriteSlice.reducer;
