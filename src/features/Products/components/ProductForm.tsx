import { Activity } from 'react';
import { useSelector } from 'react-redux';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { InputNumber } from 'primereact/inputnumber';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { classNames } from 'primereact/utils';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Product } from '@/core/domain/Product';
import { useCategoryActions } from '@/features/Categories/hooks/useCategoryAction';
import { RootState } from '@/store';
import styles from './product.module.css';

const MAX_DESCRIPTION = 250;
const MAX_NAME = 50;
const ProductSchema = Yup.object().shape({
  name: Yup.string().required('El nombre es obligatorio').min(2, 'Muy corto').max(MAX_NAME),
  price: Yup.number().required('El precio es obligatorio').positive('Debe ser mayor a 0'),
  description: Yup.string()
    .min(10, 'La descripción es muy corta')
    .max(MAX_DESCRIPTION, 'La descripción es demasiado larga'),
  categoryId: Yup.string().nullable(),
});

interface ProductFormProps {
  product?: Product | null; // Si viene es editar, si no es crear
  onSave: (values: any) => void;
  onCancel: () => void;
  loading: boolean;
}

export const ProductForm = ({ product, onSave, onCancel, loading }: ProductFormProps) => {
  const formik = useFormik({
    initialValues: {
      id: product?.id || '',
      name: product?.name || '',
      price: product?.price || 0,
      description: product?.description || '',
      categoryId: product?.category?.id || null,
    },
    validationSchema: ProductSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      onSave(values);
    },
  });
  const mode = useSelector((state: RootState) => state.products.editingMode);
  const { categories, isLoading } = useCategoryActions();

  return (
    <form onSubmit={formik.handleSubmit} className={styles.formProduct}>
      <div className={styles.field}>
        <label htmlFor="name">Nombre</label>
        <InputText
          id="name"
          name="name"
          disabled={mode === 'view' || loading}
          value={formik.values.name}
          onChange={formik.handleChange}
          className={classNames({ 'p-invalid': formik.touched.name && formik.errors.name })}
        />
        <small className={formik.values.name.length > MAX_NAME ? 'p-error' : ''}>
          {formik.values.name.length} / {MAX_NAME}
        </small>
        {formik.touched.name && formik.errors.name && (
          <small className="p-error">{formik.errors.name as string}</small>
        )}
      </div>

      <div className={styles.field}>
        <label htmlFor="price">Precio</label>
        <InputNumber
          id="price"
          value={formik.values.price}
          disabled={mode === 'view' || loading}
          onValueChange={(e) => formik.setFieldValue('price', e.value)}
          mode="currency"
          currency="EUR"
          locale="es-ES"
          className={classNames({ 'p-invalid': formik.touched.price && formik.errors.price })}
        />
      </div>
      <div className={styles.field}>
        <label htmlFor="description">Descripción</label>
        <InputTextarea
          id="description"
          name="description"
          disabled={mode === 'view' || loading}
          value={formik.values.description}
          onChange={formik.handleChange}
          className={classNames({
            'p-invalid': formik.touched.description && formik.errors.description,
          })}
        />
        <small className={formik.values.description.length > MAX_DESCRIPTION ? 'p-error' : ''}>
          {formik.values.description.length} / {MAX_DESCRIPTION}
        </small>
        {formik.touched.description && formik.errors.description && (
          <small className="p-error">{formik.errors.description as string}</small>
        )}
      </div>
      <div className={styles.field}>
        <label htmlFor="categoryId">Categoría</label>
        <Dropdown
          id="categoryId"
          name="categoryId"
          value={formik.values.categoryId} // El ID de la categoría del producto
          options={categories}
          onChange={(e) => formik.setFieldValue('categoryId', e.value)}
          optionLabel="name"
          optionValue="id"
          placeholder="Selecciona una categoría"
          disabled={mode === 'view' || loading}
          loading={isLoading && loading}
          className={formik.touched.categoryId && formik.errors.categoryId ? 'p-invalid' : ''}
        />
      </div>
      <footer className={styles.footer}>
        <Activity mode={mode !== 'view' ? 'visible' : 'hidden'}>
          <Button
            size="small"
            label="Cancelar"
            icon="pi pi-times"
            text
            loading={loading}
            onClick={onCancel}
            type="button"
          />
          <Button
            size="small"
            label={mode === 'edit' ? 'Actualizar' : 'Crear Producto'}
            icon="pi pi-check"
            loading={loading}
            type="submit"
            severity={'success'}
          />
        </Activity>
      </footer>
    </form>
  );
};

export default ProductForm;
