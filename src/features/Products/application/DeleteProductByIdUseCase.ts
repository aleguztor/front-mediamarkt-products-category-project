import { IProductRepository } from '@/core/repositories/ProductRepository';

export class DeleteProductByIdUseCase {
  constructor(private repository: IProductRepository) {}

  async execute(id: string) {
    return await this.repository.deleteBy(id);
  }
}
