import { Product } from '@/core/domain/Product';
import { IProductRepository } from '@/core/repositories/ProductRepository';
import { api } from '@/services/api';

export class ProductRemoteRepository implements IProductRepository {
  async create(product: Omit<Product, 'id'>): Promise<Product> {
    const { data } = await api.post(`/product`, product);
    return data;
  }
  async getAll(): Promise<Product[]> {
    const { data } = await api.get(`/product`);
    return data;
  }
  async getById(id: string): Promise<Product> {
    const { data } = await api.get(`/product/${id}`);
    return data;
  }

  async update(product: Partial<Product> & Pick<Product, 'id' | 'price'>): Promise<Product> {
    const { data } = await api.put(`/product`, product);
    return data;
  }

  async deleteBy(id: string): Promise<void> {
    await api.delete(`/product/${id}`);
  }
}
