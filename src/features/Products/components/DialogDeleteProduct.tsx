import { Button } from 'primereact/button';
import { ButtonGroup } from 'primereact/buttongroup';
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
        <ButtonGroup>
          <Button loading={isDeleting} label="Cancelar" onClick={() => setIdProductToDelete('')} />
          <Button
            loading={isDeleting}
            label="Eliminar"
            severity="danger"
            icon="pi pi-trash"
            outlined
            onClick={() =>
              deleteProduct(IdProductToDelete, { onSuccess: () => setIdProductToDelete('') })
            }
          />
        </ButtonGroup>
      }
    ></Dialog>
  );
};
export default DialogDeleteProduct;
