import { Product } from '@/core/domain/Product';
import { IProductRepository } from '@/core/repositories/ProductRepository';

export class UpdateProductUseCase {
  constructor(private repository: IProductRepository) {}

  async execute(product: Partial<Product> & Pick<Product, 'id' | 'price'>) {
    return await this.repository.update(product);
  }
}
