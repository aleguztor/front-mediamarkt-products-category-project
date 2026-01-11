import { Button } from 'primereact/button';
import { ButtonGroup } from 'primereact/buttongroup';
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
      resizableColumns
      virtualScrollerOptions={{ itemSize: 25 }}
      scrollable
      scrollHeight="500px"
      className={styles.table}
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
            label="Agregar Producto"
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
      <Column field="name" sortable filter header="Nombre"></Column>
      <Column field="price" sortable filter header="Precio"></Column>
      <Column
        filter
        sortable
        field="category"
        header="Categoría"
        body={(product) => product.category?.name || 'N/A'}
      ></Column>
      <Column
        align={'right'}
        body={(product) => (
          <ButtonGroup>
            <Button
              icon="pi pi-pencil"
              label="Editar"
              size="small"
              loading={isUpdating}
              onClick={() => {
                setIsEditingProduct(true);
                setProductOpen(product);
              }}
            />
            <Button
              icon="pi pi-trash"
              label="Eliminar"
              size="small"
              severity="danger"
              loading={isDeleting}
              onClick={() => setIdProductToDelete(product.id)}
            />
          </ButtonGroup>
        )}
      ></Column>
    </DataTable>
  );
};
export default DataTableProducts;
