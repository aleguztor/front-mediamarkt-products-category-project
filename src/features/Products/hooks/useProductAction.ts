import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/Contexts/ToastContext';
import { Product } from '@/core/domain/Product';
import { CreateProductUseCase } from '../application/CreateProductUseCase';
import { DeleteProductByIdUseCase } from '../application/DeleteProductByIdUseCase';
import { GetAllProductsUseCase } from '../application/GetAllProductsUseCase';
import { GetProductByIdUseCase } from '../application/GetProductByIdUseCase';
import { UpdateProductUseCase } from '../application/UpdateProductUseCase';
import { ProductRemoteRepository } from '../data/ProductsRemoteRepository';

const repo = new ProductRemoteRepository();
const getAllUC = new GetAllProductsUseCase(repo);
const getByIdUC = new GetProductByIdUseCase(repo);
const createUC = new CreateProductUseCase(repo);
const updateUC = new UpdateProductUseCase(repo);
const deleteUC = new DeleteProductByIdUseCase(repo);

export const useProductActions = () => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();
  const QUERY_KEY = ['products'];

  // 1. Obtener todos los productos
  const productsQuery = useQuery({
    queryKey: QUERY_KEY,
    queryFn: () => getAllUC.execute(),
  });

  // 2. Crear producto
  const createMutation = useMutation({
    mutationFn: (newProduct: Omit<Product, 'id'>) => createUC.execute(newProduct),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY });
      showToast('success', 'Completado', 'Producto creado con éxito');
    },
  });

  // 3. Actualizar producto (Partial pero obliga a ID y Precio)
  const updateMutation = useMutation({
    mutationFn: (data: Partial<Product> & Pick<Product, 'id' | 'price'>) => updateUC.execute(data),
    onSuccess: () => {
      showToast('success', 'Completado', 'Producto actualizado con éxito');
      queryClient.invalidateQueries({ queryKey: QUERY_KEY });
    },
  });

  // 4. Eliminar producto
  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteUC.execute(id),
    onSuccess: () => {
      showToast('success', 'Completado', 'Producto eliminado con éxito');
      queryClient.invalidateQueries({ queryKey: QUERY_KEY });
    },
  });

  const getProduct = async (id: string) => await getByIdUC.execute(id);

  return {
    products: productsQuery.data ?? [],
    isLoading: productsQuery.isLoading,
    isError: productsQuery.isError,

    createProduct: createMutation.mutate,
    isCreating: createMutation.isPending,

    updateProduct: updateMutation.mutate,
    isUpdating: updateMutation.isPending,

    deleteProduct: deleteMutation.mutate,
    isDeleting: deleteMutation.isPending,

    getProduct,
  };
};
