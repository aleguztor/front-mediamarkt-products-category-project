import { useMemo, useRef, useState } from 'react';
import { FilterMatchMode } from 'primereact/api';
import { Button } from 'primereact/button';
import { ButtonGroup } from 'primereact/buttongroup';
import { Column } from 'primereact/column';
import { DataTable, DataTableFilterMeta } from 'primereact/datatable';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { InputText } from 'primereact/inputtext';
import { Product } from '@/core/domain/Product';
import styles from './product.module.css';

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
    name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    'category.name': { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    price: { value: null, matchMode: FilterMatchMode.EQUALS },
  };
  const [filters, setFilters] = useState(initialFilters);

  const clearFilters = () => {
    setFilters(initialFilters);
    setGlobalFilterValue('');
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
    return Object.values(filters).some((filter) => {
      if (!filter) return false;

      // Si es un array de filtros (filtros avanzados)
      if (Array.isArray(filter)) {
        return filter.some((f) => f.value !== null && f.value !== '');
      }

      // Si es un filtro simple
      return (filter as any).value !== null && (filter as any).value !== '';
    });
  }, [filters]);

  return (
    <DataTable
      ref={dt}
      filters={filters}
      className={styles.table}
      onFilter={(e) => setFilters(e.filters)}
      resizableColumns
      stripedRows
      virtualScrollerOptions={{ itemSize: 25 }}
      scrollable
      scrollHeight="flex"
      selectionMode="single"
      value={products}
      header={
        <div className={styles.header}>
          <IconField style={{ flex: 1 }} iconPosition="left">
            <InputIcon className="pi pi-search" />
            <InputText
              style={{ width: '100%' }}
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
              onClick={clearFilters}
              size="small"
              severity="contrast"
            />
            <Button
              onClick={() => setIsCreatingNewProduct(true)}
              icon="pi pi-plus"
              severity="info"
              size="small"
              label={window.innerWidth > 600 ? 'Agregar Producto' : ''}
            />
          </ButtonGroup>
        </div>
      }
      loading={isLoading}
      sortOrder={-1}
      removableSort
      sortField="name"
      tableStyle={{ minWidth: '50rem' }}
      onRowClick={(product) => setProductOpen(product.data as Product)}
    >
      <Column field="name" sortable filter header="Nombre" />
      <Column
        filter
        sortable
        field="category.name"
        header="Categoría"
        body={(product) => product.category?.name || 'N/A'}
      />
      <Column
        field="price"
        sortable
        filter
        header="Precio"
        body={(product) => `${product.price + ' €'}`}
      />
      <Column
        align={'right'}
        body={(product) => (
          <div className={styles.buttonGroup}>
            <Button
              rounded
              icon="pi pi-pencil"
              size="small"
              severity="warning"
              loading={isUpdating}
              onClick={() => {
                setIsEditingProduct(true);
                setProductOpen(product);
              }}
            />
            <Button
              rounded
              icon="pi pi-trash"
              size="small"
              severity="danger"
              loading={isDeleting}
              onClick={() => setIdProductToDelete(product.id)}
            />
          </div>
        )}
      />
    </DataTable>
  );
};
export default DataTableProducts;
