import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { Product, Status, SearchProductParams, ProductSliceState } from './types';
import { identity, pickBy } from 'lodash';

export const fetchProducts = createAsyncThunk<Product[], SearchProductParams>(
  'product/fetchProductsStatus',
  async (params) => {
    const { currentPage } = params;
    const { data } = await axios.get<Product[]>(`https://fakestoreapi.com/products/`, {
      params: pickBy(
        {
          page: currentPage,
          limit: 8,
        },
        identity,
      ),
    });

    return data;
  },
);

const initialState: ProductSliceState = {
  items: [],
  status: Status.LOADING,
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<Product[]>) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = Status.LOADING;
        state.items = [];
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = Status.SUCCESS;
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.status = Status.ERROR;
        state.items = [];
      });
  },
});

export const { setItems } = productSlice.actions;

export default productSlice.reducer;
