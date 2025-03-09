import { Request, Response } from "express";
import categoryService from "../services/category.service";

class CategoryController {
  async getAll(req: Request, res: Response) {
    try {
      const categories = await categoryService.getAll();
      res.status(200).json(categories);
      return;
    } catch (error: any) {
      res
        .status(500)
        .json({ message: error?.message || "Internal Server Error" });
      return;
    }
  }
}

export default new CategoryController();
