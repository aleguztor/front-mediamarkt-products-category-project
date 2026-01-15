import { Product } from '../domain/Product';
import { PagedList } from '../models/Common/PagedList';
import { ProductsFilterRequest } from '../models/ProductsFilterRequest';

export interface IProductRepository {
  getAll(filters: ProductsFilterRequest): Promise<PagedList<Product>>;
  getById(id: string): Promise<Product>;
  update(product: Partial<Product> & Pick<Product, 'id' | 'price'>): Promise<Product>;
  deleteBy(id: string): Promise<void>;
  create(product: Omit<Product, 'id'>): Promise<Product>;
}
