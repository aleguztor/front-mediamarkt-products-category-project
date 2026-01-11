import { useMemo, useState } from 'react';
import { Product } from '@/core/domain/Product';
import DataTableProducts from '@/features/Products/components/DataTableProducts';
import DialogDeleteProduct from '@/features/Products/components/DialogDeleteProduct';
import DialogEditingProduct from '@/features/Products/components/DialogEditingProducts';
import { useProductActions } from '@/features/Products/hooks/useProductAction';

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
      <DialogEditingProduct
        productOpen={productOpen}
        isEditingProduct={isEditingProduct}
        isCreatingNewProduct={isCreatingNewProduct}
        setIsEditingProduct={setIsEditingProduct}
        closeDialogEditingProduct={closeDialogEditingProduct}
        createProduct={createProduct}
        updateProduct={updateProduct}
        isLoading={isCreating || isUpdating}
        mode={modeProduct}
      />
      <DialogDeleteProduct
        IdProductToDelete={IdProductToDelete}
        isDeleting={isDeleting}
        deleteProduct={deleteProduct}
        setIdProductToDelete={setIdProductToDelete}
      />
      <DataTableProducts
        products={products}
        isLoading={isLoading}
        isUpdating={isUpdating}
        isDeleting={isDeleting}
        setIdProductToDelete={setIdProductToDelete}
        setProductOpen={setProductOpen}
        setIsEditingProduct={setIsEditingProduct}
        setIsCreatingNewProduct={setIsCreatingNewProduct}
      />
    </>
  );
};

export default ProductPage;
