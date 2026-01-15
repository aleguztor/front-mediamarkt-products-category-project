import TitlePage from '@/components/TitlePage/TitlePage';
import DataTableProducts from '@/features/Products/components/DataTableProduct/DataTableProducts';
import DialogDeleteProduct from '@/features/Products/components/DialogDeleteProduct';
import DialogEditingProduct from '@/features/Products/components/DialogEditingProducts';
import styles from './productPage.module.css';

const ProductPage = () => {
  return (
    <div className={styles.productPage}>
      <TitlePage title="Productos" />
      <DialogEditingProduct />
      <DialogDeleteProduct />
      <DataTableProducts />
    </div>
  );
};
export default ProductPage;
