import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchProducts: any = createAsyncThunk(
  'products/fetchProducts',
  async ({limit = 10, skip = 0}: any) => {
    const response = await axios.get(
      `https://dummyjson.com/products?limit=${limit}&skip=${skip}`,
    );
    return response.data;
  },
);

export const fetchCategories: any = createAsyncThunk(
  'products/fetchCategories',
  async () => {
    const response = await axios.get(
      'https://dummyjson.com/products/categories',
    );
    return response.data;
  },
);

export const fetchProductsByCategory: any = createAsyncThunk(
  'products/fetchProductsByCategory',
  async category => {
    const response = await axios.get(
      `https://dummyjson.com/products/category/${category}`,
    );
    return response.data.products;
  },
);

export const fetchProductDetail: any = createAsyncThunk(
  'products/fetchProductDetail',
  async productId => {
    const response = await axios.get(
      `https://dummyjson.com/products/${productId}`,
    );
    return response.data;
  },
);

const productSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    total: 0,
    loading: false,
    skip: 0,
    productDetail: null,
  },
  reducers: {
    resetProducts: state => {
      state.items = [];
      state.skip = 0;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchProducts.pending, state => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state: any, action) => {
        state.loading = false;
        state.items = [...state.items, ...action.payload.products];
        state.total = action.payload.total;
        state.skip += action.payload.limit;
      })
      .addCase(fetchCategories.fulfilled, (state: any, action) => {
        state.categories = action.payload;
      })
      .addCase(fetchProductsByCategory.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(fetchProductDetail.pending, state => {
        state.loading = true;
      })
      .addCase(fetchProductDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.productDetail = action.payload;
      })
      .addCase(fetchProductDetail.rejected, state => {
        state.loading = false;
      });
  },
});

export const {resetProducts} = productSlice.actions;
export default productSlice.reducer;
