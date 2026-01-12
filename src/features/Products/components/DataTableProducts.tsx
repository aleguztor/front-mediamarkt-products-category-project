import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
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
  return (
    <DataTable
      className={styles.table}
      resizableColumns
      stripedRows
      virtualScrollerOptions={{ itemSize: 25 }}
      scrollable
      scrollHeight="flex"
      selectionMode="single"
      value={products}
      header={
        <div className={styles.header}>
          <h2>Productos</h2>
          <Button
            onClick={() => setIsCreatingNewProduct(true)}
            icon="pi pi-plus"
            severity="info"
            size="small"
            label={window.innerWidth > 600 ? 'Agregar Producto' : ''}
          />
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
