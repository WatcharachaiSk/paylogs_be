import Category from "../models/category.model";
import CategoryRepository from "../repositories/category.repository";
import { CategoriesMockup } from "../utils/constant/mockup/categories.mockup";

class CategoryService {
  async seedCategories() {
    const count = await CategoryRepository.getCount();

    if (count === 0) {
      await CategoryRepository.createMany(CategoriesMockup);
      console.log("✅ Categories seeded successfully!");
    } else {
      console.log("⚡ Categories already exist. No seeding needed.");
    }
  }
}

export default new CategoryService();
