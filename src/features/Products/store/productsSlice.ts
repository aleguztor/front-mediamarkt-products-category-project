import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Product } from '@/core/domain/Product';
import { EditingMode } from '../types';

export interface ProducState {
  editingMode: EditingMode;
  idProductToDelete: string;
  productOpen: Product | null;
  isEditingProduct: boolean;
  isCreatingNewProduct: boolean;
}

const initialState: ProducState = {
  editingMode: 'view',
  idProductToDelete: '',
  productOpen: null,
  isEditingProduct: false,
  isCreatingNewProduct: false,
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setEditingMode: (state, action: PayloadAction<EditingMode>) => {
      state.editingMode = action.payload;
    },
    setIdProductToDelete: (state, action: PayloadAction<string>) => {
      state.idProductToDelete = action.payload;
    },
    setProductOpen: (state, action: PayloadAction<Product | null>) => {
      state.productOpen = action.payload;
    },
    setIsEditingProduct: (state, action: PayloadAction<boolean>) => {
      state.isEditingProduct = action.payload;
    },
    setIsCreatingNewProduct: (state, action: PayloadAction<boolean>) => {
      state.isCreatingNewProduct = action.payload;
    },
  },
});

export const {
  setEditingMode,
  setIdProductToDelete,
  setProductOpen,
  setIsEditingProduct,
  setIsCreatingNewProduct,
} = productSlice.actions;
export default productSlice.reducer;
