import { useCallback, useMemo, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FilterService } from 'primereact/api';
import { DataTable, DataTableSortEvent } from 'primereact/datatable';
import { Product } from '@/core/domain/Product';
import { RootState } from '@/store';
import { useProductActions } from '../../hooks/useProductAction';
import {
  intialStatePagingAndSortBy,
  setFiltersFromDataTable,
  setPagingAndSortBy,
  setProductOpen,
} from '../../store/productsSlice';
import ColumnActions from './ColumnActions';
import ColumnCategory from './ColumnCategory';
import ColumnName from './ColumnName';
import ColumnPrice from './ColumnPrice';
import styles from './datatableproduct.module.css';

FilterService.register('custom_price', (value, filters) => {
  const [from, to] = filters ?? [null, null];
  if (from === null && to === null) return true;
  if (from !== null && to === null) return from <= value;
  if (from === null && to !== null) return value <= to;
  return from <= value && value <= to;
});

const DataTableProducts = () => {
  const dispatch = useDispatch();
  const pagingAndSortBy = useSelector((state: RootState) => state.products.pagingAndSortBy);
  const filtersFromDataTable = useSelector(
    (state: RootState) => state.products.filtersFromDataTable,
  );

  const { totalRecords, products, isLoading } = useProductActions();
  const dt = useRef<DataTable<Product[]>>(null);

  const onFilterChange = useCallback(
    (e: any) => {
      dispatch(setFiltersFromDataTable(e.filters));
      dispatch(
        setPagingAndSortBy({
          ...pagingAndSortBy,
          pageNumber: intialStatePagingAndSortBy.pageNumber,
        }),
      );
    },
    [dispatch, pagingAndSortBy, intialStatePagingAndSortBy],
  );

  const onPageChange = useCallback(
    (event: any) => {
      dispatch(
        setPagingAndSortBy({
          pageNumber: event.page + 1,
          pageSize: event.rows,
        }),
      );
    },
    [dispatch],
  );

  const onSort = useCallback(
    (event: DataTableSortEvent) => {
      dispatch(
        setPagingAndSortBy({
          sortBy: event.sortField,
          isDescending: event.sortOrder === -1,
        }),
      );
    },
    [dispatch],
  );
  const columnsNoRerender = useMemo(() => [ColumnPrice(), ColumnName()], []);
  return (
    <DataTable
      lazy
      filterDisplay="row"
      first={(pagingAndSortBy.pageNumber - 1) * pagingAndSortBy.pageSize}
      rows={pagingAndSortBy.pageSize}
      totalRecords={totalRecords}
      onPage={onPageChange}
      ref={dt}
      paginator
      resizableColumns
      filters={filtersFromDataTable}
      className={styles.table}
      onFilter={onFilterChange}
      scrollable
      rowsPerPageOptions={[5, 10, 25, 50, 100]}
      selectionMode="single"
      value={products}
      loading={isLoading}
      sortField={pagingAndSortBy.sortBy}
      sortOrder={pagingAndSortBy.isDescending ? -1 : 1}
      onSort={onSort}
      removableSort
      tableStyle={{ minWidth: '50rem' }}
      onRowClick={(product) => dispatch(setProductOpen(product.data as Product))}
    >
      {columnsNoRerender}
      {ColumnCategory()}
      {ColumnActions()}
    </DataTable>
  );
};
export default DataTableProducts;
