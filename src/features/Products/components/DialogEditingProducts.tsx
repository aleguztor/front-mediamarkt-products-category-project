import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import ProductForm from '@/features/Products/components/ProductForm';
import { RootState } from '@/store';
import { useProductActions } from '../hooks/useProductAction';
import {
  setEditingMode,
  setIsCreatingNewProduct,
  setIsEditingProduct,
  setProductOpen,
} from '../store/productsSlice';

const DialogEditingProduct = () => {
  const dispatch = useDispatch();
  const { isCreating, isUpdating, createProduct, updateProduct } = useProductActions();
  const isLoading = useMemo(() => isCreating || isUpdating, [isCreating, isUpdating]);
  const mode = useSelector((state: RootState) => state.products.editingMode);
  const { productOpen, isEditingProduct, isCreatingNewProduct } = useSelector(
    (state: RootState) => state.products,
  );

  const closeDialogEditingProduct = () => {
    dispatch(setIsEditingProduct(false));
    dispatch(setIsCreatingNewProduct(false));
    dispatch(setProductOpen(null));
  };

  useEffect(() => {
    dispatch(setEditingMode(isEditingProduct ? 'edit' : productOpen ? 'view' : 'create'));
  }, [isEditingProduct, productOpen, dispatch]);

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
            onClick={() => dispatch(setIsEditingProduct(!isEditingProduct))}
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
