import { useMemo, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { FilterMatchMode, FilterService } from 'primereact/api';
import { DataTable, DataTableFilterMeta } from 'primereact/datatable';
import { Product } from '@/core/domain/Product';
import { useCategoryActions } from '@/features/Categories/hooks/useCategoryAction';
import { useProductActions } from '../../hooks/useProductAction';
import { setIsEditingProduct, setProductOpen } from '../../store/productsSlice';
import ColumnActions from './ColumnActions';
import ColumnCategory from './ColumnCategory';
import ColumnName from './ColumnName';
import ColumnPrice from './ColumnPrice';
import HeaderDataTableProduct from './HeaderDataTableProduct';
import styles from './datatableproduct.module.css';

const DataTableProducts = () => {
  const [globalFilterValue, setGlobalFilterValue] = useState<string>('');
  const dispatch = useDispatch();
  const { filters, updateFilters, pagination, products, isLoading } = useProductActions();

  const dt = useRef<DataTable<Product[]>>(null);
  const initialFilters: DataTableFilterMeta = {
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    name: { value: null, matchMode: FilterMatchMode.CONTAINS },
    'category.name': { value: null, matchMode: FilterMatchMode.IN },
    price: { value: [null, null], matchMode: FilterMatchMode.CUSTOM },
  };
  const [filtersComponent, setFilters] = useState(initialFilters);
  const { categories } = useCategoryActions();
  const clearFilters = () => {
    setFilters(initialFilters);
    setGlobalFilterValue('');
    updateFilters({
      pageNumber: 1,
      name: null,
      generalSearch: null,
      category: null,
      minPrice: null,
      maxPrice: null,
    });
  };
  const openEditingProduct = (product: Product) => {
    dispatch(setIsEditingProduct(true));
    dispatch(setProductOpen(product));
  };
  const onGlobalFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    let _filters = { ...filtersComponent };
    (_filters['global'] as any).value = value;

    setFilters(_filters);
    setGlobalFilterValue(value);
    updateFilters({ generalSearch: value, pageNumber: 1 });
  };

  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const onFilterChange = (e: any) => {
    setFilters(e.filters);

    if (timer.current) clearTimeout(timer.current);

    timer.current = setTimeout(() => {
      const _filters = e.filters;
      updateFilters({
        pageNumber: 1,
        name: _filters.name?.value || null,
        generalSearch: _filters.global?.value || null,
        category: _filters['category.name']?.value || null,
        minPrice: _filters.price?.value?.[0] ?? null,
        maxPrice: _filters.price?.value?.[1] ?? null,
      });
    }, 400);
  };

  const hasFilters = useMemo(() => {
    return Object.entries(filtersComponent).some(([key, filter]) => {
      if (!filter || !('value' in filter)) return false;

      const value = (filter as any).value;

      // 1. Caso especial: Rango de Precio (Array de dos valores [from, to])
      if (key === 'price' && Array.isArray(value)) {
        return value.some((v) => v !== null && v !== '');
      }

      // 2. Caso especial: Categoría (MultiSelect usa Array de strings)
      if (key === 'category.name' && Array.isArray(value)) {
        return value.length > 0;
      }

      // 3. Caso general: Strings, números o null
      return value !== null && value !== '';
    });
  }, [filters]);

  const categoryOptions = useMemo(() => {
    return categories.map((cat) => cat.name);
  }, [categories]);

  FilterService.register('custom_price', (value, filters) => {
    const [from, to] = filters ?? [null, null];
    if (from === null && to === null) return true;
    if (from !== null && to === null) return from <= value;
    if (from === null && to !== null) return value <= to;
    return from <= value && value <= to;
  });
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
      filters={filtersComponent}
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
          hasFilters={hasFilters}
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
      {ColumnCategory({ categoryOptions })}
      {ColumnActions({ openEditingProduct })}
    </DataTable>
  );
};
export default DataTableProducts;
