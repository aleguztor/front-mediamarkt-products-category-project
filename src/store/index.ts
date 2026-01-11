import { configureStore } from '@reduxjs/toolkit';
import categoryReducer from '@/features/Categories/store/categorySlice';

export const store = configureStore({
  reducer: {
    categories: categoryReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
