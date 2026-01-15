import { Column } from 'primereact/column';
import styles from './datatableproduct.module.css';

const ColumnName = () => {
  return (
    <Column
      field="name"
      sortable
      showFilterMenu={false}
      filter
      header="Nombre"
      filterPlaceholder="Buscar por nombre"
      body={(product) => <span className={styles.spanName}>{product.name}</span>}
    />
  );
};

export default ColumnName;
