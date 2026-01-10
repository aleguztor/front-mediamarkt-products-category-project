import { Category } from '../domain/Category';

export interface ICategoryRepository {
  getAll(): Promise<Category[]>;
}
