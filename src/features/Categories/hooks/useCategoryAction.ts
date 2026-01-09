// src/features/users/presentation/hooks/useUserActions.ts
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { User } from '@/core/domain/entities/User';
import { CreateUserUseCase } from '../../application/CreateUserUseCase';
import { GetUsersUseCase } from '../../application/GetUsersUseCase';
import { UserRemoteRepository } from '../../data/UserRemoteRepository';

// Inyección de dependencias
const repo = new UserRemoteRepository();
const getUsersUC = new GetUsersUseCase(repo);
const createUserUC = new CreateUserUseCase(repo);

export const useUserActions = () => {
  const queryClient = useQueryClient();

  // 1. La Query para obtener todos
  const usersQuery = useQuery({
    queryKey: ['users'],
    queryFn: () => getUsersUC.execute(),
  });

  // 2. La Mutation para crear uno nuevo
  const createUserMutation = useMutation({
    mutationFn: (newUser: Omit<User, 'id'>) => createUserUC.execute(newUser),
    onSuccess: () => {
      // Invalidamos la caché para que la tabla de PrimeReact se refresque sola
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });

  // Retornamos todo el "set" de herramientas de este dominio
  return {
    users: usersQuery.data ?? [],
    isLoading: usersQuery.isLoading,
    isError: usersQuery.isError,
    createUser: createUserMutation.mutate,
    isCreating: createUserMutation.isPending,
  };
};
