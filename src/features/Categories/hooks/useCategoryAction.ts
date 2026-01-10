import { useQuery } from '@tanstack/react-query';
import { GetCategoriesUseCase } from '../application/GetCategoriesUseCase';
import { CategoryRemoteRepository } from '../data/CategoryRemoteRepository';

const repo = new CategoryRemoteRepository();
const getCategoriesUC = new GetCategoriesUseCase(repo);

export const useCategoryActions = () => {
  const usersQuery = useQuery({
    queryKey: ['categories'],
    queryFn: () => getCategoriesUC.execute(),
  });

  return {
    categories: usersQuery.data ?? [],
    isLoading: usersQuery.isLoading,
    isError: usersQuery.isError,
  };
};
