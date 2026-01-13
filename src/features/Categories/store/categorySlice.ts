import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Category } from '@/core/domain/Category';

export interface CategoryState {
  items: Category[];
}

const initialState: CategoryState = {
  items: [],
};

const categorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    setCategories: (state, action: PayloadAction<Category[]>) => {
      state.items = action.payload;
    },
  },
});

export const { setCategories } = categorySlice.actions;
export default categorySlice.reducer;
