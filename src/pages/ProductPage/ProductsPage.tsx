import { useMemo, useState } from 'react';
import { Button } from 'primereact/button';
import { ButtonGroup } from 'primereact/buttongroup';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dialog } from 'primereact/dialog';
import ProductForm from '@/components/Product/ProductForm';
import { Product } from '@/core/domain/Product';
import { useProductActions } from '@/features/Products/hooks/useProductAction';
import styles from './productPage.module.css';

const ProductPage = () => {
  const {
    products,
    isLoading,
    isDeleting,
    deleteProduct,
    isCreating,
    isUpdating,
    createProduct,
    updateProduct,
  } = useProductActions();
  const [productOpen, setProductOpen] = useState<Product | null>(null);
  const [isEditingProduct, setIsEditingProduct] = useState<boolean>(false);
  const [IdProductToDelete, setIdProductToDelete] = useState<string>('');
  const [isCreatingNewProduct, setIsCreatingNewProduct] = useState<boolean>(false);

  const header = () => {
    return (
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
    );
  };
  const modeProduct = useMemo(
    () => (isEditingProduct ? 'edit' : productOpen ? 'view' : 'create'),
    [isEditingProduct, productOpen],
  );
  const closeDialogEditingProduct = () => {
    setProductOpen(null);
    setIsEditingProduct(false);
    setIsCreatingNewProduct(false);
  };

  return (
    <>
      <Dialog
        draggable={false}
        header={
          productOpen == null && !isEditingProduct ? 'Crear Nuevo Producto' : productOpen?.name
        }
        visible={productOpen !== null || isCreatingNewProduct}
        style={{ width: '50vw' }}
        icons={
          modeProduct !== 'create' && (
            <Button
              style={{ padding: 5 }}
              size="small"
              icon={isEditingProduct ? 'pi pi-eye' : 'pi pi-pencil'}
              text
              outlined
              onClick={() => setIsEditingProduct(!isEditingProduct)}
            />
          )
        }
        onHide={() => closeDialogEditingProduct()}
      >
        <ProductForm
          product={productOpen}
          loading={isUpdating || isCreating}
          onCancel={() => closeDialogEditingProduct()}
          onSave={(values) => {
            productOpen == null && !isEditingProduct
              ? createProduct(values, {
                  onSuccess: () => closeDialogEditingProduct(),
                })
              : updateProduct(values, {
                  onSuccess: () => closeDialogEditingProduct(),
                });
          }}
          mode={modeProduct}
        />
      </Dialog>
      <Dialog
        header="¿Estás seguro/a de eliminar este producto?"
        visible={IdProductToDelete !== ''}
        style={{ width: '50vw' }}
        onHide={() => setIdProductToDelete('')}
        footer={
          <ButtonGroup>
            <Button
              loading={isDeleting}
              label="Cancelar"
              onClick={() => setIdProductToDelete('')}
            />
            <Button
              loading={isDeleting}
              label="Eliminar"
              severity="danger"
              icon="pi pi-trash"
              outlined
              onClick={() =>
                deleteProduct(IdProductToDelete, { onSuccess: () => setIdProductToDelete('') })
              }
            />
          </ButtonGroup>
        }
      ></Dialog>
      <DataTable
        resizableColumns
        virtualScrollerOptions={{ itemSize: 25 }}
        scrollable
        scrollHeight="500px"
        className={styles.table}
        selectionMode="single"
        value={products}
        header={header}
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
    </>
  );
};

export default ProductPage;
