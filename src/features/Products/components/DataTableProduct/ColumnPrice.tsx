import { Column, ColumnFilterElementTemplateOptions } from 'primereact/column';
import { InputNumber } from 'primereact/inputnumber';
import styles from './datatableproduct.module.css';

const ColumnPrice = () => {
  return (
    <Column
      field="price"
      style={{ minWidth: '12rem', maxWidth: '14rem' }}
      filter
      sortable
      dataType="numeric"
      showFilterMenu={false}
      header="Precio"
      filterElement={PriceRowFilterTemplate}
      body={(product) => <span className={styles.spanPrice}>{product.price + ' €'}</span>}
    />
  );
};
export default ColumnPrice;

const PriceRowFilterTemplate = (options: ColumnFilterElementTemplateOptions) => {
  const [from, to] = options.value ?? [null, null];
  return (
    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
      <InputNumber
        mode="currency"
        style={{ flex: 1, minWidth: '5rem' }}
        currency="EUR"
        locale="es-ES"
        value={from}
        onChange={(e) => options.filterApplyCallback([e.value, to])}
        placeholder="Desde"
      />
      <InputNumber
        value={to}
        style={{ flex: 1, minWidth: '5rem' }}
        mode="currency"
        currency="EUR"
        locale="es-ES"
        onChange={(e) => options.filterApplyCallback([from, e.value])}
        placeholder="Hasta"
      />
    </div>
  );
};
