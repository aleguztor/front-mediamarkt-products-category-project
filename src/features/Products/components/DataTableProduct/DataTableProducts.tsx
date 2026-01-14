import { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FilterService } from 'primereact/api';
import { DataTable, DataTableFilterMeta } from 'primereact/datatable';
import { Product } from '@/core/domain/Product';
import { RootState } from '@/store';
import { useProductActions } from '../../hooks/useProductAction';
import {
  intialStateFilters,
  resetFiltersFromDataTable,
  setFiltersFromDataTable,
  setProductOpen,
} from '../../store/productsSlice';
import ColumnActions from './ColumnActions';
import ColumnCategory from './ColumnCategory';
import ColumnName from './ColumnName';
import ColumnPrice from './ColumnPrice';
import HeaderDataTableProduct from './HeaderDataTableProduct';
import styles from './datatableproduct.module.css';

const DataTableProducts = () => {
  const dispatch = useDispatch();
  const filters = useSelector((state: RootState) => state.products.filters);
  const filtersFromDataTable = useSelector(
    (state: RootState) => state.products.filtersFromDataTable,
  );

  const [globalFilterValue, setGlobalFilterValue] = useState<string>('');
  const { updateFilters, pagination, products, isLoading } = useProductActions();
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const dt = useRef<DataTable<Product[]>>(null);

  FilterService.register('custom_price', (value, filters) => {
    const [from, to] = filters ?? [null, null];
    if (from === null && to === null) return true;
    if (from !== null && to === null) return from <= value;
    if (from === null && to !== null) return value <= to;
    return from <= value && value <= to;
  });

  const clearFilters = () => {
    dispatch(resetFiltersFromDataTable());
    setGlobalFilterValue('');
    updateFilters(intialStateFilters);
  };

  const onGlobalFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const newTableFilters: DataTableFilterMeta = {
      ...filtersFromDataTable,
      global: {
        ...filtersFromDataTable['global'],
        value: value || null,
      },
    };

    dispatch(setFiltersFromDataTable(newTableFilters));
    setGlobalFilterValue(value);
    updateFilters({ generalSearch: value, pageNumber: 1 });
  };

  const onFilterChange = (e: any) => {
    dispatch(setFiltersFromDataTable(e.filters));

    if (timer.current) clearTimeout(timer.current);

    timer.current = setTimeout(() => {
      const _filters = e.filters;
      updateFilters({
        pageNumber: intialStateFilters.pageNumber,
        name: _filters.name?.value || null,
        generalSearch: _filters.global?.value || null,
        category: _filters['category.name']?.value || null,
        minPrice: _filters.price?.value?.[0] ?? null,
        maxPrice: _filters.price?.value?.[1] ?? null,
      });
    }, 250);
  };

  const onPageChange = (event: any) => {
    updateFilters({
      pageNumber: event.page + 1,
      pageSize: event.rows,
    });
  };

  return (
    <DataTable
      lazy
      filterDisplay="row"
      first={(filters.pageNumber - 1) * filters.pageSize}
      rows={filters.pageSize}
      totalRecords={pagination.totalCount}
      onPage={onPageChange}
      ref={dt}
      paginator
      resizableColumns
      filters={filtersFromDataTable}
      className={styles.table}
      onFilter={onFilterChange}
      scrollable
      rowsPerPageOptions={[5, 10, 25, 50, 100]}
      scrollHeight="flex"
      selectionMode="single"
      value={products}
      header={
        <HeaderDataTableProduct
          clearFilters={clearFilters}
          globalFilterValue={globalFilterValue}
          onGlobalFilterChange={onGlobalFilterChange}
        />
      }
      loading={isLoading}
      sortOrder={-1}
      removableSort
      sortField="name"
      tableStyle={{ minWidth: '50rem' }}
      onRowClick={(product) => dispatch(setProductOpen(product.data as Product))}
    >
      {ColumnPrice()}
      {ColumnName()}
      {ColumnCategory()}
      {ColumnActions()}
    </DataTable>
  );
};
export default DataTableProducts;
