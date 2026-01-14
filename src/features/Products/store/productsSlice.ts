import { FilterMatchMode } from 'primereact/api';
import { DataTableFilterMeta } from 'primereact/datatable';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Product } from '@/core/domain/Product';
import { ProductsFilterRequest } from '@/core/models/ProductsFilterRequest';
import { EditingMode } from '../types';

export interface ProducState {
  editingMode: EditingMode;
  idProductToDelete: string;
  productOpen: Product | null;
  isEditingProduct: boolean;
  isCreatingNewProduct: boolean;
  filters: ProductsFilterRequest;
  filtersFromDataTable: DataTableFilterMeta;
}

const initialFilters: DataTableFilterMeta = {
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  name: { value: null, matchMode: FilterMatchMode.CONTAINS },
  'category.name': { value: null, matchMode: FilterMatchMode.IN },
  price: { value: [null, null], matchMode: FilterMatchMode.CUSTOM },
};

export const intialStateFilters: ProductsFilterRequest = {
  pageNumber: 1,
  pageSize: 10,
};
const initialState: ProducState = {
  editingMode: 'view',
  idProductToDelete: '',
  productOpen: null,
  isEditingProduct: false,
  isCreatingNewProduct: false,
  filters: intialStateFilters,
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
    setFilters: (state, action: PayloadAction<Partial<ProductsFilterRequest>>) => {
      state.filters = {
        ...state.filters,
        ...action.payload,
        pageNumber: action.payload.pageNumber ?? intialStateFilters.pageNumber,
      };
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
  setIsCreatingNewProduct,
  setFilters,
  setFiltersFromDataTable,
  resetFiltersFromDataTable,
} = productSlice.actions;
export default productSlice.reducer;
