import TitlePage from '@/components/TitlePage/TitlePage';
import DataTableProducts from '@/features/Products/components/DataTableProduct/DataTableProducts';
import DialogDeleteProduct from '@/features/Products/components/DialogDeleteProduct';
import DialogEditingProduct from '@/features/Products/components/DialogEditingProducts';

const ProductPage = () => {
  return (
    <>
      <TitlePage title="Productos" />
      <DialogEditingProduct />
      <DialogDeleteProduct />
      <DataTableProducts />
    </>
  );
};
export default ProductPage;
