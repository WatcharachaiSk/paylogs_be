import { Request, Response } from "express";
import logsService from "../services/logs.service";
import { IExpense } from "../models/expenses.model";
import { AuthenticatedRequest } from "../middleware/auth.middleware";
import mongoose from "mongoose";
import * as _ from "lodash";
import {
  newToEndOfDayUTC,
  newToStartOfDayUTC,
  toEndOfDayUTC,
  toStartOfDayUTC,
} from "../utils/date";

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
    const oderby = req.query.oderby as string;
    const stDate = req.query.stDate as string;
    const endDate = req.query.endDate as string;
    const userId = req.user?.id;

    const sortOption = _.toNumber(oderby) == 1 ? 1 : -1;

    const start = stDate ? toStartOfDayUTC(stDate) : newToStartOfDayUTC();
    const end = endDate ? toEndOfDayUTC(endDate) : newToEndOfDayUTC();

    try {
      if (!userId) {
        res.status(401).json({ message: "Unauthorized: No userId" });
        return;
      }
      const query = {
        stDate: new Date(start),
        endDate: new Date(end),
        oderby: sortOption,
      };
      // console.log("stDate is ", stDate);
      // console.log("endDate is ", endDate);
      // console.log("query is ", query);

      const logs = await logsService.getAllByUser(userId, query);
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
