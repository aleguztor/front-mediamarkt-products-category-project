import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'primereact/button';
import { ButtonGroup } from 'primereact/buttongroup';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { InputText } from 'primereact/inputtext';
import { RootState } from '@/store';
import { setIsCreatingNewProduct } from '../../store/productsSlice';
import styles from './datatableproduct.module.css';

const HeaderDataTableProduct = ({
  clearFilters,
  onGlobalFilterChange,
  globalFilterValue,
}: {
  clearFilters: () => void;
  onGlobalFilterChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  globalFilterValue: string;
}) => {
  const dispatch = useDispatch();
  const filters = useSelector((state: RootState) => state.products.filters);

  const hasFilters = useMemo(() => {
    const nonFilterKeys = ['pageNumber', 'pageSize'];
    console.log(filters);
    return Object.entries(filters).some(([key, value]) => {
      if (nonFilterKeys.includes(key)) return false;

      if (key === 'category' && Array.isArray(value)) {
        return value.length > 0;
      }

      // Para strings o números
      return value !== null && value !== '' && value !== undefined;
    });
  }, [filters]);
  return (
    <div className={styles.header}>
      {hasFilters + ''}
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
          onClick={() => dispatch(setIsCreatingNewProduct(true))}
          icon="pi pi-plus"
          style={{ backgroundColor: 'var(--red)', border: '1px solid var(--red)' }}
          size="small"
          label={window.innerWidth > 600 ? 'Agregar Producto' : ''}
        />
      </ButtonGroup>
    </div>
  );
};
export default HeaderDataTableProduct;
