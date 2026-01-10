import { Product } from '@/core/domain/Product';
import { IProductRepository } from '@/core/repositories/ProductRepository';

export class CreateProductUseCase {
  constructor(private repository: IProductRepository) {}

  async execute(product: Omit<Product, 'id'>) {
    return await this.repository.create(product);
  }
}
