import { Product } from '@/core/domain/Product';
import { ProductRepository } from '@/core/repositories/ProductRepository';
import { api } from '@/services/api';

export class ProductRemoteRepository implements ProductRepository {
  async getAll(): Promise<Product[]> {
    const { data } = await api.patch(`/products`);
    return data;
  }
  async getById(id: string): Promise<Product> {
    const { data } = await api.patch(`/products/${id}`);
    return data;
  }

  async update(id: string, product: Partial<Product>): Promise<Product> {
    const { data } = await api.patch(`/products/${id}`, product);
    return data;
  }

  async deleteBy(id: string): Promise<void> {
    await api.delete(`/products/${id}`);
  }
}
