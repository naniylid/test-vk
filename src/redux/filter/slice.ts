import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FilterSliceState } from './types';

const initialState: FilterSliceState = {
  currentPage: 1,
};

const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setFilters(state, action: PayloadAction<FilterSliceState>) {
      if (Object.keys(action.payload).length) {
        state.currentPage = Number(action.payload.currentPage);
      } else {
        state.currentPage = 1;
      }
    },
  },
});

export const { setCurrentPage, setFilters } = filterSlice.actions;

export default filterSlice.reducer;
