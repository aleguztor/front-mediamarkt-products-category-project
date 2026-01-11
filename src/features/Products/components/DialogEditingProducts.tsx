import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import ProductForm from '@/components/Product/ProductForm';

export interface DialogEditingProductProps {
  productOpen: any;
  isEditingProduct: boolean;
  isCreatingNewProduct: boolean;
  setIsEditingProduct: (isEditing: boolean) => void;
  closeDialogEditingProduct: () => void;
  createProduct: (values: any, options: { onSuccess: () => void }) => void;
  updateProduct: (values: any, options: { onSuccess: () => void }) => void;
  isLoading: boolean;
  mode: 'create' | 'edit' | 'view';
}

const DialogEditingProduct = ({
  productOpen,
  isEditingProduct,
  isCreatingNewProduct,
  setIsEditingProduct,
  closeDialogEditingProduct,
  createProduct,
  updateProduct,
  isLoading,
  mode,
}: DialogEditingProductProps) => {
  return (
    <Dialog
      draggable={false}
      header={productOpen == null && !isEditingProduct ? 'Crear Nuevo Producto' : productOpen?.name}
      visible={productOpen !== null || isCreatingNewProduct}
      style={{ width: '50vw' }}
      icons={
        mode !== 'create' && (
          <Button
            style={{ marginRight: 5 }}
            size="small"
            rounded
            icon={isEditingProduct ? 'pi pi-eye' : 'pi pi-pencil'}
            text
            severity={isEditingProduct ? 'info' : 'warning'}
            outlined
            onClick={() => setIsEditingProduct(!isEditingProduct)}
          />
        )
      }
      onHide={() => closeDialogEditingProduct()}
    >
      <ProductForm
        product={productOpen}
        loading={isLoading}
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
        mode={mode}
      />
    </Dialog>
  );
};
export default DialogEditingProduct;
