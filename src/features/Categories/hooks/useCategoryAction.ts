import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useQuery } from '@tanstack/react-query';
import { RootState } from '@/store';
import { GetCategoriesUseCase } from '../application/GetCategoriesUseCase';
import { CategoryRemoteRepository } from '../data/CategoryRemoteRepository';
import { setCategories } from '../store/categorySlice';

const repo = new CategoryRemoteRepository();
const getCategoriesUC = new GetCategoriesUseCase(repo);

export const useCategoryActions = () => {
  const dispatch = useDispatch();

  const categoriesFromRedux = useSelector((state: RootState) => state.categories.items);

  const { data, isLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: () => getCategoriesUC.execute(),
    staleTime: Infinity,
  });

  useEffect(() => {
    if (data) {
      dispatch(setCategories(data));
    }
  }, [data, dispatch]);

  return {
    categories: categoriesFromRedux,
    isLoading: isLoading && categoriesFromRedux.length === 0,
  };
};
