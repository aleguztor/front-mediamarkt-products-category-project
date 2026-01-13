import { Category } from './Category';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: Category;
}
