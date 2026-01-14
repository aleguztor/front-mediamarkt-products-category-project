import { useDispatch, useSelector } from 'react-redux';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { keepPreviousData } from '@tanstack/react-query';
import { useToast } from '@/Contexts/ToastContext';
import { Product } from '@/core/domain/Product';
import { PagedList } from '@/core/models/Common/PagedList';
import { ProductsFilterRequest } from '@/core/models/ProductsFilterRequest';
import { RootState } from '@/store';
import { CreateProductUseCase } from '../application/CreateProductUseCase';
import { DeleteProductByIdUseCase } from '../application/DeleteProductByIdUseCase';
import { GetAllProductsUseCase } from '../application/GetAllProductsUseCase';
import { GetProductByIdUseCase } from '../application/GetProductByIdUseCase';
import { UpdateProductUseCase } from '../application/UpdateProductUseCase';
import { ProductRemoteRepository } from '../data/ProductsRemoteRepository';
import { setFilters } from '../store/productsSlice';

const repo = new ProductRemoteRepository();
const getAllUC = new GetAllProductsUseCase(repo);
const getByIdUC = new GetProductByIdUseCase(repo);
const createUC = new CreateProductUseCase(repo);
const updateUC = new UpdateProductUseCase(repo);
const deleteUC = new DeleteProductByIdUseCase(repo);

export const useProductActions = () => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const { showToast } = useToast();
  const QUERY_KEY = ['products'];
  const filters = useSelector((state: RootState) => state.products.filters);

  // 1. Obtener todos los productos
  const productsQuery = useQuery<PagedList<Product>>({
    queryKey: [...QUERY_KEY, filters],
    queryFn: () => getAllUC.execute(filters),
    placeholderData: keepPreviousData,
  });

  const invalidateProducts = () => {
    queryClient.invalidateQueries({
      queryKey: QUERY_KEY,
      exact: false, // IMPORTANTE: Invalida todas las que empiecen por ['products']
    });
  };

  // 2. Crear producto
  const createMutation = useMutation({
    mutationFn: (newProduct: Omit<Product, 'id'>) => createUC.execute(newProduct),
    onSuccess: () => {
      invalidateProducts();
      showToast('success', 'Completado', 'Producto creado con éxito');
    },
  });

  // 3. Actualizar producto (Partial pero obliga a ID y Precio)
  const updateMutation = useMutation({
    mutationFn: (data: Partial<Product> & Pick<Product, 'id' | 'price'>) => updateUC.execute(data),
    onSuccess: () => {
      invalidateProducts();
      showToast('success', 'Completado', 'Producto actualizado con éxito');
    },
  });

  // 4. Eliminar producto
  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteUC.execute(id),
    onSuccess: () => {
      invalidateProducts();
      showToast('success', 'Completado', 'Producto eliminado con éxito');
    },
  });

  // 5. Función para actualizar filtros desde el componente (UI)
  const updateFilters = (newFilters: Partial<ProductsFilterRequest>) => {
    dispatch(setFilters(newFilters));
  };
  const getProduct = async (id: string) => await getByIdUC.execute(id);

  return {
    products: productsQuery.data?.items ?? [],
    isLoading: productsQuery.isLoading,
    isError: productsQuery.isError,

    createProduct: createMutation.mutate,
    isCreating: createMutation.isPending,

    updateProduct: updateMutation.mutate,
    isUpdating: updateMutation.isPending,

    deleteProduct: deleteMutation.mutate,
    isDeleting: deleteMutation.isPending,

    pagination: {
      totalCount: productsQuery.data?.totalCount ?? 0,
      totalPages: productsQuery.data?.totalPages ?? 0,
      currentPage: productsQuery.data?.currentPage ?? 1,
    },
    updateFilters,
    getProduct,
  };
};
