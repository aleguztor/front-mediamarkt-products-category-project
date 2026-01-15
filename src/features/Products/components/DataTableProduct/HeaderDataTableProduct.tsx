import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'primereact/button';
import { ButtonGroup } from 'primereact/buttongroup';
import { DataTableFilterMeta } from 'primereact/datatable';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { InputText } from 'primereact/inputtext';
import { RootState } from '@/store';
import { getFieldValue } from '@/utils/primeReactUtils';
import { useProductActions } from '../../hooks/useProductAction';
import {
  resetFiltersFromDataTable,
  resetPagingAndSortBy,
  setFiltersFromDataTable,
  setIsCreatingNewProduct,
  setPagingAndSortBy,
} from '../../store/productsSlice';
import styles from './datatableproduct.module.css';

const HeaderDataTableProduct = () => {
  const dispatch = useDispatch();
  const filtersFromDataTable = useSelector(
    (state: RootState) => state.products.filtersFromDataTable,
  );
  const pagingAndSortBy = useSelector((state: RootState) => state.products.pagingAndSortBy);
  const { hasFilters } = useProductActions();
  const globalFilterValue = getFieldValue<string>(filtersFromDataTable, 'global') ?? '';

  const onGlobalFilterChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      const newTableFilters: DataTableFilterMeta = {
        ...filtersFromDataTable,
        global: {
          ...filtersFromDataTable['global'],
          value: value || null,
        },
      };
      dispatch(setFiltersFromDataTable(newTableFilters));
      dispatch(
        setPagingAndSortBy({
          ...pagingAndSortBy,
          pageNumber: 1,
        }),
      );
    },
    [dispatch, pagingAndSortBy, filtersFromDataTable],
  );

  return (
    <div className={styles.header}>
      <IconField className={styles.containerInputText} iconPosition="left">
        <InputIcon className="pi pi-search" />
        <InputText
          value={globalFilterValue}
          onChange={onGlobalFilterChange}
          placeholder="Buscar producto..."
          className="p-inputtext-sm"
        />
      </IconField>
      <ButtonGroup>
        <Button
          type="button"
          icon="pi pi-filter-slash"
          label="Limpiar"
          disabled={!hasFilters}
          onClick={() => {
            dispatch(resetPagingAndSortBy());
            dispatch(resetFiltersFromDataTable());
          }}
          size="small"
          severity="contrast"
        />
        <Button
          className={styles.addProductButton}
          onClick={() => dispatch(setIsCreatingNewProduct(true))}
          icon="pi pi-plus"
          size="small"
          label={'Agregar Producto'}
        />
      </ButtonGroup>
    </div>
  );
};
export default HeaderDataTableProduct;
