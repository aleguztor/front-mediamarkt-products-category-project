import { FilterMatchMode } from 'primereact/api';
import { DataTableFilterMeta } from 'primereact/datatable';
import * as Yup from 'yup';
import { PagingAndSortBy } from '../types';

export const MAX_DESCRIPTION = 250;
export const MAX_NAME = 50;
export const creationProductFormRequirements = Yup.object().shape({
  name: Yup.string().required('El nombre es obligatorio').min(2, 'Muy corto').max(MAX_NAME),
  price: Yup.number().required('El precio es obligatorio').positive('Debe ser mayor a 0'),
  description: Yup.string()
    .min(10, 'La descripción es muy corta')
    .max(MAX_DESCRIPTION, 'La descripción es demasiado larga'),
  categoryId: Yup.string().nullable(),
});

export const initialFilters: DataTableFilterMeta = {
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  name: { value: null, matchMode: FilterMatchMode.CONTAINS },
  'category.name': { value: null, matchMode: FilterMatchMode.IN },
  price: { value: null, matchMode: FilterMatchMode.CUSTOM },
};

export const intialStatePagingAndSortBy: PagingAndSortBy = {
  pageNumber: 1,
  pageSize: 10,
  sortBy: 'name',
  isDescending: false,
};
