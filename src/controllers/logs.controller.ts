import { Request, Response } from "express";
import logsService from "../services/logs.service";
import { IExpense } from "../models/expenses.model";
import { AuthenticatedRequest } from "../middleware/auth.middleware";
import mongoose from "mongoose";
import * as _ from "lodash";

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
  async getAllUser(req: AuthenticatedRequest, res: Response) {
    try {
      const userId = req.user?.id;
      if (!userId) {
        res.status(401).json({ message: "Unauthorized: No userId" });
        return;
      }
      // const logs = await logsService.getById(userId);
      const logs = await logsService.getAllByUser(userId);
      if (_.isEmpty(logs)) {
        res.status(404).json({ message: "logs not found" });
        return;
      }
      res.status(200).json(logs);
      return;
    } catch (error: any) {
      res
        .status(500)
        .json({ message: error?.message || "Internal Server Error" });
      return;
    }
  }
  async getById(req: Request, res: Response) {
    try {
      const id = req?.params.id as string;
      const logs = await logsService.getById(id);
      if (_.isEmpty(logs)) {
        res.status(404).json({ message: "logs not found" });
        return;
      }
      res.status(200).json(logs);
      return;
    } catch (error: any) {
      res
        .status(500)
        .json({ message: error?.message || "Internal Server Error" });
      return;
    }
  }

  async update(req: Request, res: Response) {
    try {
      const body = req?.body;
      const { id, ...payload } = body;
      const updateLogs = await logsService.update(id, payload);
      if (_.isEmpty(updateLogs)) {
        res.status(404).json({ message: "logs not found" });
        return;
      }
      res.status(200).json(updateLogs);
      return;
    } catch (error: any) {
      res
        .status(500)
        .json({ message: error?.message || "Internal Server Error" });
      return;
    }
  }
  async softDelete(req: Request, res: Response) {
    try {
      const id = req?.body?.id as string;
      const logs = await logsService.softDelete(id);
      if (_.isEmpty(logs)) {
        res.status(404).json({ message: "logs not found" });
        return;
      }
      res.status(200).json({ message: "delete success " + req.body.id });
      return;
    } catch (error: any) {
      res
        .status(500)
        .json({ message: error?.message || "Internal Server Error" });
      return;
    }
  }
}

export default new LogsController();
