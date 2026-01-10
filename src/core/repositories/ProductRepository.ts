import { Product } from '../domain/Product';

export interface ProductRepository {
  getAll(): Promise<Product[]>;
  getById(id: string): Promise<Product>;
  update(product: Partial<Product> & Pick<Product, 'id' | 'price'>): Promise<Product>;
  deleteBy(id: string): Promise<void>;
  create(product: Omit<Product, 'id'>): Promise<Product>;
}
