import { ICategoryRepository } from '@/core/repositories/CategoryRepository';

export class GetCategoriesUseCase {
  constructor(private repository: ICategoryRepository) {}

  async execute() {
    return await this.repository.getAll();
  }
}
