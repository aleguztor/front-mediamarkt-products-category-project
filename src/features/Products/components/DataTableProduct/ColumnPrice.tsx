import { Column, ColumnFilterElementTemplateOptions } from 'primereact/column';
import { InputNumber } from 'primereact/inputnumber';

const ColumnPrice = () => {
  return (
    <Column
      field="price"
      style={{ minWidth: '15rem' }}
      filter
      sortable
      dataType="numeric"
      showFilterMenu={false}
      header="Precio"
      filterElement={PriceRowFilterTemplate}
      body={(product) => `${product.price + ' €'}`}
    />
  );
};
export default ColumnPrice;

const PriceRowFilterTemplate = (options: ColumnFilterElementTemplateOptions) => {
  const [from, to] = options.value ?? [null, null];
  return (
    <div style={{ display: 'flex', gap: '10px' }}>
      <InputNumber
        mode="currency"
        currency="EUR"
        locale="es-ES"
        value={from}
        onChange={(e) => options.filterApplyCallback([e.value, to])}
        placeholder="Desde"
      />
      <InputNumber
        value={to}
        mode="currency"
        currency="EUR"
        locale="es-ES"
        onChange={(e) => options.filterApplyCallback([from, e.value])}
        placeholder="Hasta"
      />
    </div>
  );
};
