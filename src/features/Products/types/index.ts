import { DataTableFilterMeta } from 'primereact/datatable';
import { Product } from '@/core/domain/Product';

export type EditingMode = 'create' | 'edit' | 'view';

export interface ProducState {
  editingMode: EditingMode;
  idProductToDelete: string;
  productOpen: Product | null;
  isEditingProduct: boolean;
  isCreatingNewProduct: boolean;
  pagingAndSortBy: PagingAndSortBy;
  filtersFromDataTable: DataTableFilterMeta;
}
export interface PagingAndSortBy {
  pageNumber: number;
  pageSize: number;
  sortBy: string;
  isDescending: boolean;
}
