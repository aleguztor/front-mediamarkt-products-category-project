import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { EditingMode } from '../types';

export interface ProducState {
  editingMode: EditingMode;
}

const initialState: ProducState = {
  editingMode: 'view',
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setEditingMode: (state, action: PayloadAction<EditingMode>) => {
      state.editingMode = action.payload;
    },
  },
});

export const { setEditingMode } = productSlice.actions;
export default productSlice.reducer;
