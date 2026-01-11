import { useLayoutEffect, useRef, useState } from 'react';
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
  const [tableHeight, setTableHeight] = useState('500px');
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const updateHeight = () => {
      if (containerRef.current) {
        const newHeight = window.innerHeight - 250;
        setTableHeight(`${newHeight}px`);
      }
    };
    updateHeight();
    window.addEventListener('resize', updateHeight);
    return () => window.removeEventListener('resize', updateHeight);
  }, []);

  return (
    <div className={styles.containerTable} ref={containerRef}>
      <DataTable
        className={styles.table}
        resizableColumns
        virtualScrollerOptions={{ itemSize: 25 }}
        scrollable
        style={{ height: tableHeight }}
        scrollHeight={tableHeight}
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
                icon="pi pi-trash"
                size="small"
                severity="danger"
                rounded
                loading={isDeleting}
                onClick={() => setIdProductToDelete(product.id)}
              />
            </div>
          )}
        ></Column>
      </DataTable>
    </div>
  );
};
export default DataTableProducts;
