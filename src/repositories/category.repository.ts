import Category, { CategoryType, ICategory } from "../models/category.model";

class CategoryRepository {
  async getCount(): Promise<number> {
    return await Category.countDocuments();
  }
  async createMany(data: CategoryType[]): Promise<ICategory[]> {
    const result = await Category.insertMany(data);
    return result;
  }
  async getAll() {
    return await Category.find().sort({ priority: 1 });
  }
}

export default new CategoryRepository();
