import { useDispatch } from 'react-redux';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { Product } from '@/core/domain/Product';
import { useProductActions } from '../../hooks/useProductAction';
import {
  setIdProductToDelete,
  setIsEditingProduct,
  setProductOpen,
} from '../../store/productsSlice';
import styles from './datatableproduct.module.css';

const ColumnActions = () => {
  const dispatch = useDispatch();
  const { isUpdating, isDeleting } = useProductActions();

  const openEditingProduct = (product: Product) => {
    dispatch(setIsEditingProduct(true));
    dispatch(setProductOpen(product));
  };
  return (
    <Column
      style={{ minWidth: '10rem' }}
      align={'right'}
      body={(product) => (
        <div className={styles.buttonGroup}>
          <Button
            rounded
            icon="pi pi-pencil"
            size="small"
            severity="secondary"
            loading={isUpdating}
            onClick={() => openEditingProduct(product)}
          />
          <Button
            rounded
            icon="pi pi-trash"
            size="small"
            severity="secondary"
            loading={isDeleting}
            onClick={() => dispatch(setIdProductToDelete(product.name))}
          />
        </div>
      )}
    />
  );
};
export default ColumnActions;
