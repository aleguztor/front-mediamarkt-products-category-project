import { useMemo, useRef, useState } from 'react';
import { FilterMatchMode, FilterService } from 'primereact/api';
import { Button } from 'primereact/button';
import { ButtonGroup } from 'primereact/buttongroup';
import { Column, ColumnFilterElementTemplateOptions } from 'primereact/column';
import { DataTable, DataTableFilterMeta } from 'primereact/datatable';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { InputNumber } from 'primereact/inputnumber';
import { InputText } from 'primereact/inputtext';
import { MultiSelect, MultiSelectChangeEvent } from 'primereact/multiselect';
import { Product } from '@/core/domain/Product';
import { useCategoryActions } from '@/features/Categories/hooks/useCategoryAction';
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
  const categoryFilterTemplate = (options: ColumnFilterElementTemplateOptions) => {
    return (
      <MultiSelect
        value={options.value}
        options={categoryOptions}
        onChange={(e: MultiSelectChangeEvent) => options.filterApplyCallback(e.value)}
        placeholder="Cualquiera"
        maxSelectedLabels={1} // Muestra "2 categorías" si hay muchas seleccionadas
        selectedItemsLabel={'{0} seleccionadas'}
        style={{ minWidth: '14rem' }}
      />
    );
  };
  const PriceRowFilterTemplate = (options: ColumnFilterElementTemplateOptions) => {
    const [from, to] = options.value ?? [null, null];
    return (
      <div style={{ display: 'flex', gap: '10px' }}>
        <InputNumber
          mode="currency"
          currency="EUR"
          locale="es-ES"
          value={from}
          onChange={(e) => options.filterApplyCallback([e.value, to])}
          placeholder="Desde"
        />
        <InputNumber
          value={to}
          mode="currency"
          currency="EUR"
          locale="es-ES"
          onChange={(e) => options.filterApplyCallback([from, e.value])}
          placeholder="Hasta"
        />
      </div>
    );
  };

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
      stripedRows
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
        showFilterMenu={false}
        sortable
        filterMenuStyle={{ width: '14rem' }}
        filterField="category.name"
        header="Categoría"
        filterElement={categoryFilterTemplate}
        filterPlaceholder="Buscar por categoría"
        body={(product) => product.category?.name || 'N/A'}
      />
      <Column
        field="price"
        style={{ minWidth: '15rem' }}
        filter
        sortable
        dataType="numeric"
        showFilterMenu={false}
        header="Precio"
        filterElement={PriceRowFilterTemplate}
        body={(product) => `${product.price + ' €'}`}
      />
      <Column
        style={{ minWidth: '10rem' }}
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
