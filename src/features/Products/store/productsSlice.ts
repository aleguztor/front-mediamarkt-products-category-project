import { DataTableFilterMeta } from 'primereact/datatable';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Product } from '@/core/domain/Product';
import { ProductsFilterRequest } from '@/core/models/ProductsFilterRequest';
import { initialFilters, intialStatePagingAndSortBy } from '../constants/product.constants';
import { EditingMode, ProducState } from '../types';

const initialState: ProducState = {
  editingMode: 'view',
  idProductToDelete: '',
  productOpen: null,
  isEditingProduct: false,
  isCreatingNewProduct: false,
  pagingAndSortBy: intialStatePagingAndSortBy,
  filtersFromDataTable: initialFilters,
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
    setPagingAndSortBy: (state, action: PayloadAction<Partial<ProductsFilterRequest>>) => {
      state.pagingAndSortBy = {
        ...state.pagingAndSortBy,
        ...action.payload,
        pageNumber: action.payload.pageNumber ?? intialStatePagingAndSortBy.pageNumber,
      };
    },
    resetPagingAndSortBy: (state) => {
      state.pagingAndSortBy = intialStatePagingAndSortBy;
    },
    setFiltersFromDataTable: (state, action: PayloadAction<DataTableFilterMeta>) => {
      state.filtersFromDataTable = action.payload;
    },
    resetFiltersFromDataTable: (state) => {
      state.filtersFromDataTable = initialFilters;
    },
  },
});

export const {
  setEditingMode,
  setIdProductToDelete,
  setProductOpen,
  setIsEditingProduct,
  resetPagingAndSortBy,
  setIsCreatingNewProduct,
  setPagingAndSortBy,
  setFiltersFromDataTable,
  resetFiltersFromDataTable,
} = productSlice.actions;
export default productSlice.reducer;
