import { configureStore } from '@reduxjs/toolkit';
import filterSlice from './filter/slice';
import cartSlice from './cart/slice';
import productSlice from './product/slice';
import { useDispatch } from 'react-redux';

export const store = configureStore({
  reducer: {
    filterSlice,
    cartSlice,
    productSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
