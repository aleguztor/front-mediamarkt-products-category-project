import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { Product } from '@/core/domain/Product';
import styles from './datatableproduct.module.css';

export interface ColumnActions {
  isUpdating: boolean;
  isDeleting: boolean;
  openEditingProduct: (product: Product) => void;
  setIdProductToDelete: (value: string) => void;
}

const ColumnActions = ({
  isUpdating,
  isDeleting,
  openEditingProduct,
  setIdProductToDelete,
}: ColumnActions) => {
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
            severity="warning"
            loading={isUpdating}
            onClick={() => {
              openEditingProduct(product);
              // setIsEditingProduct(true);
              // setProductOpen(product);
            }}
          />
          <Button
            rounded
            icon="pi pi-trash"
            size="small"
            severity="danger"
            loading={isDeleting}
            onClick={() => setIdProductToDelete(product.id)}
          />
        </div>
      )}
    />
  );
};
export default ColumnActions;
