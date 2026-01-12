import { Column } from 'primereact/column';

// Si no usa props, no las declares
const ColumnName = () => {
  return (
    <Column field="name" sortable filter header="Nombre" filterPlaceholder="Buscar por nombre" />
  );
};

export default ColumnName;
