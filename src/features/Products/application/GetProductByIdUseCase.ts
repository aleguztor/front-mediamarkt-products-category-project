import { IProductRepository } from '@/core/repositories/ProductRepository';

export class GetProductByIdUseCase {
  constructor(private repository: IProductRepository) {}

  async execute(id: string) {
    return await this.repository.getById(id);
  }
}
