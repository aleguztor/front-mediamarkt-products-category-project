import { useMemo } from 'react';
import { Column, ColumnFilterElementTemplateOptions } from 'primereact/column';
import { MultiSelect, MultiSelectChangeEvent } from 'primereact/multiselect';
import { useCategoryActions } from '@/features/Categories/hooks/useCategoryAction';

const ColumnCategory = () => {
  const { categories } = useCategoryActions();
  const categoryOptions = useMemo(() => {
    return categories.map((cat) => cat.name);
  }, [categories]);

  return (
    <Column
      filter
      showFilterMenu={false}
      sortable
      field="category.name"
      filterMenuStyle={{ width: '14rem' }}
      filterField="category.name"
      header="Categoría"
      filterElement={(options: ColumnFilterElementTemplateOptions) => {
        return (
          <MultiSelect
            value={options.value}
            options={categoryOptions}
            onChange={(e: MultiSelectChangeEvent) => options.filterApplyCallback(e.value)}
            placeholder="Cualquiera"
            maxSelectedLabels={1}
            selectedItemsLabel={'{0} seleccionadas'}
            style={{ minWidth: '14rem' }}
          />
        );
      }}
      filterPlaceholder="Buscar por categoría"
      body={(product) => product.category?.name || 'N/A'}
    />
  );
};
export default ColumnCategory;
