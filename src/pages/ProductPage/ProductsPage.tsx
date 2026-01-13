import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import TitlePage from '@/components/TitlePage/TitlePage';
import { Product } from '@/core/domain/Product';
import DataTableProducts from '@/features/Products/components/DataTableProduct/DataTableProducts';
import DialogDeleteProduct from '@/features/Products/components/DialogDeleteProduct';
import DialogEditingProduct from '@/features/Products/components/DialogEditingProducts';
import { useProductActions } from '@/features/Products/hooks/useProductAction';
import { setEditingMode } from '@/features/Products/store/productsSlice';

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
  const dispatch = useDispatch();
  const [productOpen, setProductOpen] = useState<Product | null>(null);
  const [isEditingProduct, setIsEditingProduct] = useState<boolean>(false);
  const [IdProductToDelete, setIdProductToDelete] = useState<string>('');
  const [isCreatingNewProduct, setIsCreatingNewProduct] = useState<boolean>(false);

  useEffect(() => {
    dispatch(setEditingMode(isEditingProduct ? 'edit' : productOpen ? 'view' : 'create'));
  }, [isEditingProduct, productOpen, dispatch]);

  const closeDialogEditingProduct = () => {
    setIsEditingProduct(false);
    setIsCreatingNewProduct(false);
    setProductOpen(null);
  };

  return (
    <>
      <TitlePage title="Productos" />
      <DialogEditingProduct
        productOpen={productOpen}
        isEditingProduct={isEditingProduct}
        isCreatingNewProduct={isCreatingNewProduct}
        setIsEditingProduct={setIsEditingProduct}
        closeDialogEditingProduct={closeDialogEditingProduct}
        createProduct={createProduct}
        updateProduct={updateProduct}
        isLoading={isCreating || isUpdating}
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
