import { configureStore } from '@reduxjs/toolkit';
import categoryReducer from '@/features/Categories/store/categorySlice';
import productSlice from '@/features/Products/store/productsSlice';

export const store = configureStore({
  reducer: {
    categories: categoryReducer,
    products: productSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
