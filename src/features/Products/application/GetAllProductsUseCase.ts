import { Product } from '@/core/domain/Product';
import { PagedList } from '@/core/models/Common/PagedList';
import { ProductsFilterRequest } from '@/core/models/ProductsFilterRequest';
import { IProductRepository } from '@/core/repositories/ProductRepository';

export class GetAllProductsUseCase {
  constructor(private repository: IProductRepository) {}

  async execute(request: ProductsFilterRequest): Promise<PagedList<Product>> {
    return await this.repository.getAll(request);
  }
}
