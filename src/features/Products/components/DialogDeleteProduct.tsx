import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { RootState } from '@/store';
import { useProductActions } from '../hooks/useProductAction';
import { setIdProductToDelete } from '../store/productsSlice';

const DialogDeleteProduct = () => {
  const idProductToDelete = useSelector((state: RootState) => state.products.idProductToDelete);
  const { isDeleting, deleteProduct } = useProductActions();
  const dispatch = useDispatch();
  return (
    <Dialog
      header="¿Estás seguro/a de eliminar este producto?"
      visible={idProductToDelete !== ''}
      style={{ width: '50vw' }}
      onHide={() => dispatch(setIdProductToDelete(''))}
      footer={
        <>
          <Button
            size="small"
            label="Cancelar"
            icon="pi pi-times"
            text
            loading={isDeleting}
            onClick={() => dispatch(setIdProductToDelete(''))}
          />
          <Button
            loading={isDeleting}
            label="Eliminar"
            severity="danger"
            icon="pi pi-trash"
            onClick={() =>
              deleteProduct(idProductToDelete, {
                onSuccess: () => dispatch(setIdProductToDelete('')),
              })
            }
          />
        </>
      }
    ></Dialog>
  );
};
export default DialogDeleteProduct;
