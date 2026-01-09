import { Category } from '../domain/Category';

export interface CategoryRepository {
  getAll(): Promise<Category[]>;
  getById(id: string): Promise<Category>;
  update(id: string, category: Partial<Category>): Promise<Category>;
  deleteBy(id: string): Promise<void>;
}
