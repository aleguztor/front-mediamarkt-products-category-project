import { DataTableFilterMeta, DataTableFilterMetaData } from 'primereact/datatable';

export const getFieldValue = <T = any>(filters: DataTableFilterMeta, field: string): T | null => {
  const filter = filters[field];

  if (filter && !('operator' in filter)) {
    return (filter as DataTableFilterMetaData).value ?? null;
  }

  if (filter && 'constraints' in filter) {
    return (filter.constraints[0]?.value as T) ?? null;
  }

  return null;
};
