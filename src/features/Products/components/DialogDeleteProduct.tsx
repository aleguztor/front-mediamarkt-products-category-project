import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';

export interface DialogDeleteProductProps {
  IdProductToDelete: string;
  isDeleting: boolean;
  deleteProduct: (id: string, options: { onSuccess: () => void }) => void;
  setIdProductToDelete: (id: string) => void;
}

const DialogDeleteProduct = ({
  IdProductToDelete,
  isDeleting,
  deleteProduct,
  setIdProductToDelete,
}: DialogDeleteProductProps) => {
  return (
    <Dialog
      header="¿Estás seguro/a de eliminar este producto?"
      visible={IdProductToDelete !== ''}
      style={{ width: '50vw' }}
      onHide={() => setIdProductToDelete('')}
      footer={
        <>
          <Button
            size="small"
            label="Cancelar"
            icon="pi pi-times"
            text
            loading={isDeleting}
            onClick={() => setIdProductToDelete('')}
          />
          <Button
            loading={isDeleting}
            label="Eliminar"
            severity="danger"
            icon="pi pi-trash"
            onClick={() =>
              deleteProduct(IdProductToDelete, { onSuccess: () => setIdProductToDelete('') })
            }
          />
        </>
      }
    ></Dialog>
  );
};
export default DialogDeleteProduct;
