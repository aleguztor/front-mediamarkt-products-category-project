import { Button } from 'primereact/button';
import { ButtonGroup } from 'primereact/buttongroup';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { InputText } from 'primereact/inputtext';
import styles from './datatableproduct.module.css';

const HeaderDataTableProduct = ({
  hasFilters,
  clearFilters,
  setIsCreatingNewProduct,
  onGlobalFilterChange,
  globalFilterValue,
}: {
  hasFilters: boolean;
  clearFilters: () => void;
  setIsCreatingNewProduct: (value: boolean) => void;
  onGlobalFilterChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  globalFilterValue: string;
}) => {
  return (
    <div className={styles.header}>
      <IconField style={{ flex: 1 }} iconPosition="left">
        <InputIcon className="pi pi-search" />
        <InputText
          style={{ width: '100%' }}
          value={globalFilterValue}
          onChange={onGlobalFilterChange}
          placeholder="Buscar producto..."
          className="p-inputtext-sm"
        />
      </IconField>
      <ButtonGroup>
        <Button
          type="button"
          icon="pi pi-filter-slash"
          label="Limpiar"
          disabled={!hasFilters}
          onClick={clearFilters}
          size="small"
          severity="contrast"
        />
        <Button
          onClick={() => setIsCreatingNewProduct(true)}
          icon="pi pi-plus"
          severity="info"
          size="small"
          label={window.innerWidth > 600 ? 'Agregar Producto' : ''}
        />
      </ButtonGroup>
    </div>
  );
};
export default HeaderDataTableProduct;
