import { IProductRepository } from '@/core/repositories/ProductRepository';

export class GetAllProductsUseCase {
  constructor(private repository: IProductRepository) {}

  async execute() {
    return await this.repository.getAll();
  }
}
