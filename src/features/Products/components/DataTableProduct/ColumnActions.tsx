import { useDispatch } from 'react-redux';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { Product } from '@/core/domain/Product';
import { useProductActions } from '../../hooks/useProductAction';
import { setIdProductToDelete } from '../../store/productsSlice';
import styles from './datatableproduct.module.css';

export interface ColumnActions {
  openEditingProduct: (product: Product) => void;
}

const ColumnActions = ({ openEditingProduct }: ColumnActions) => {
  const dispatch = useDispatch();
  const { isUpdating, isDeleting } = useProductActions();
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
            onClick={() => dispatch(setIdProductToDelete(product.id))}
          />
        </div>
      )}
    />
  );
};
export default ColumnActions;
