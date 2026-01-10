import { Category } from '@/core/domain/Category';
import { ICategoryRepository } from '@/core/repositories/CategoryRepository';
import { api } from '@/services/api';

export class CategoryRemoteRepository implements ICategoryRepository {
  async getAll(): Promise<Category[]> {
    const { data } = await api.get(`/category`);
    return data;
  }
}
