import { Request, Response } from "express";
import logsService from "../services/logs.service";
import { IExpense } from "../models/expenses.model";
import { AuthenticatedRequest } from "../middleware/auth.middleware";
import mongoose from "mongoose";

class LogsController {
  async create(req: AuthenticatedRequest, res: Response) {
    try {
      const userId = req.user?.id;
      if (!userId) {
        res.status(401).json({ message: "Unauthorized: No userId" });
        return;
      }
      const expenseData = req.body as Partial<IExpense>;
      const payload: Partial<IExpense> = {
        ...expenseData,
        user: new mongoose.Types.ObjectId(userId),
      };
      const categories = await logsService.create(payload);
      res.status(200).json(categories);
      return;
    } catch (error: any) {
      res
        .status(500)
        .json({ message: error?.message || "Internal Server Error" });
      return;
    }
  }
  async getAll(req: Request, res: Response) {
    try {
      // const categories = await LogsService.getAll();
      res.status(200).json("logs");
      return;
    } catch (error: any) {
      res
        .status(500)
        .json({ message: error?.message || "Internal Server Error" });
      return;
    }
  }
  async getById(req: Request, res: Response) {}
}

export default new LogsController();
