import { PagingParams } from './Common/PagingParams';

export interface ProductsFilterRequest extends PagingParams {
  generalSearch?: string | null;
  minPrice?: number | null;
  maxPrice?: number | null;
  name?: string | null;
  category?: string[] | null;
  sortBy: string;
  isDescending: boolean;
}
