import { useSelector } from 'react-redux';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import ProductForm from '@/features/Products/components/ProductForm';
import { RootState } from '@/store';

export interface DialogEditingProductProps {
  productOpen: any;
  isEditingProduct: boolean;
  isCreatingNewProduct: boolean;
  setIsEditingProduct: (isEditing: boolean) => void;
  closeDialogEditingProduct: () => void;
  createProduct: (values: any, options: { onSuccess: () => void }) => void;
  updateProduct: (values: any, options: { onSuccess: () => void }) => void;
  isLoading: boolean;
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
}: DialogEditingProductProps) => {
  const mode = useSelector((state: RootState) => state.products.editingMode);
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
      />
    </Dialog>
  );
};
export default DialogEditingProduct;
