import { useMemo, useRef, useState } from 'react';
import { FilterMatchMode, FilterService } from 'primereact/api';
import { DataTable, DataTableFilterMeta } from 'primereact/datatable';
import { Product } from '@/core/domain/Product';
import { useCategoryActions } from '@/features/Categories/hooks/useCategoryAction';
import ColumnActions from './ColumnActions';
import ColumnCategory from './ColumnCategory';
import ColumnName from './ColumnName';
import ColumnPrice from './ColumnPrice';
import HeaderDataTableProduct from './HeaderDataTableProduct';
import styles from './datatableproduct.module.css';

export interface DataTableProductsProps {
  products: Product[];
  isLoading: boolean;
  isUpdating: boolean;
  isDeleting: boolean;
  setIdProductToDelete: (id: string) => void;
  setProductOpen: (product: Product) => void;
  setIsEditingProduct: (isEditing: boolean) => void;
  setIsCreatingNewProduct: (isCreating: boolean) => void;
}

const DataTableProducts = ({
  products,
  isLoading,
  isUpdating,
  isDeleting,
  setIdProductToDelete,
  setProductOpen,
  setIsEditingProduct,
  setIsCreatingNewProduct,
}: DataTableProductsProps) => {
  const [globalFilterValue, setGlobalFilterValue] = useState<string>('');
  const dt = useRef<DataTable<Product[]>>(null);
  const initialFilters: DataTableFilterMeta = {
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    name: { value: null, matchMode: FilterMatchMode.CONTAINS },
    'category.name': { value: null, matchMode: FilterMatchMode.IN },
    price: { value: [null, null], matchMode: FilterMatchMode.CUSTOM },
  };
  const [filters, setFilters] = useState(initialFilters);
  const { categories } = useCategoryActions();
  const clearFilters = () => {
    setFilters(initialFilters);
    setGlobalFilterValue('');
  };
  const openEditingProduct = (product: Product) => {
    setIsEditingProduct(true);
    setProductOpen(product);
  };
  const onGlobalFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    let _filters = { ...filters };

    // Actualizamos el valor en el objeto de filtros de PrimeReact
    (_filters['global'] as any).value = value;

    setFilters(_filters);
    setGlobalFilterValue(value);
  };
  const hasFilters = useMemo(() => {
    return Object.entries(filters).some(([key, filter]) => {
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

  return (
    <DataTable
      filterDisplay="row"
      ref={dt}
      resizableColumns
      filters={filters}
      className={styles.table}
      onFilter={(e) => setFilters(e.filters)}
      scrollable
      scrollHeight="flex"
      selectionMode="single"
      value={products}
      header={
        <HeaderDataTableProduct
          clearFilters={clearFilters}
          globalFilterValue={globalFilterValue}
          hasFilters={hasFilters}
          onGlobalFilterChange={onGlobalFilterChange}
          setIsCreatingNewProduct={setIsCreatingNewProduct}
        />
      }
      loading={isLoading}
      sortOrder={-1}
      removableSort
      sortField="name"
      tableStyle={{ minWidth: '50rem' }}
      onRowClick={(product) => setProductOpen(product.data as Product)}
    >
      {ColumnPrice()}
      {ColumnName()}
      {ColumnCategory({ categoryOptions })}
      {ColumnActions({ isDeleting, isUpdating, openEditingProduct, setIdProductToDelete })}
    </DataTable>
  );
};
export default DataTableProducts;
