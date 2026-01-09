import { Product } from '../domain/Product';

export interface ProductRepository {
  getAll(): Promise<Product[]>;
  getById(id: string): Promise<Product>;
  update(id: string, product: Partial<Product>): Promise<Product>;
  deleteBy(id: string): Promise<void>;
}
