import { useEffect, useMemo, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { keepPreviousData } from '@tanstack/react-query';
import { useToast } from '@/Contexts/ToastContext';
import { Product } from '@/core/domain/Product';
import { PagedList } from '@/core/models/Common/PagedList';
import { ProductsFilterRequest } from '@/core/models/ProductsFilterRequest';
import { RootState } from '@/store';
import { getFieldValue } from '@/utils/primeReactUtils';
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

const initialProductsFilterRequest: ProductsFilterRequest = {
  isDescending: false,
  pageNumber: 1,
  pageSize: 10,
  sortBy: 'name',
  category: null,
  generalSearch: null,
  minPrice: null,
  maxPrice: null,
};

export const useProductActions = () => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();
  const QUERY_KEY = ['products'];
  const [products, setProducts] = useState<ProductsFilterRequest>(initialProductsFilterRequest);
  const [isDebouncing, setIsDebouncing] = useState(false);
  const filtersFromDataTable = useSelector(
    (state: RootState) => state.products.filtersFromDataTable,
  );
  const pagingAndSortBy = useSelector((state: RootState) => state.products.pagingAndSortBy);

  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setIsDebouncing(true);
    const mapper: ProductsFilterRequest = {
      isDescending: pagingAndSortBy.isDescending,
      pageNumber: pagingAndSortBy.pageNumber,
      pageSize: pagingAndSortBy.pageSize,
      sortBy: pagingAndSortBy.sortBy,
      name: getFieldValue(filtersFromDataTable, 'name'),
      category: getFieldValue<string[] | null>(filtersFromDataTable, 'category.name'),
      generalSearch: getFieldValue(filtersFromDataTable, 'global'),
      minPrice: (getFieldValue(filtersFromDataTable, 'price') as any)?.[0] ?? null,
      maxPrice: (getFieldValue(filtersFromDataTable, 'price') as any)?.[1] ?? null,
    };
    if (timer.current) clearTimeout(timer.current);

    timer.current = setTimeout(() => {
      setProducts(mapper);
      setIsDebouncing(false);
    }, 400);
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [filtersFromDataTable, pagingAndSortBy]);
  const hasFilters = useMemo(() => {
    return Object.entries(filtersFromDataTable).some(([key, filterObj]) => {
      const filter = filterObj as { value: any };

      if (filter.value === null || filter.value === undefined) return false;

      if (key === 'category.name' && Array.isArray(filter.value)) {
        return filter.value.length > 0;
      }

      if (key === 'price' && Array.isArray(filter.value)) {
        return filter.value.some((v) => v !== null && v !== undefined);
      }
      if (typeof filter.value === 'string') {
        return filter.value.trim().length > 0;
      }

      return false;
    });
  }, [filtersFromDataTable]);
  const productsQuery = useQuery<PagedList<Product>>({
    queryKey: [...QUERY_KEY, products],
    queryFn: () => getAllUC.execute(products),
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

  const getProduct = async (id: string) => await getByIdUC.execute(id);

  return {
    products: productsQuery.data?.items ?? [],
    isLoading: productsQuery.isLoading || productsQuery.isFetching || isDebouncing,
    isError: productsQuery.isError,

    createProduct: createMutation.mutate,
    isCreating: createMutation.isPending,

    updateProduct: updateMutation.mutate,
    isUpdating: updateMutation.isPending,

    deleteProduct: deleteMutation.mutate,
    isDeleting: deleteMutation.isPending,
    totalRecords: productsQuery.data?.totalCount ?? 0,
    getProduct,
    hasFilters,
  };
};
