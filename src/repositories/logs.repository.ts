import mongoose from "mongoose";
import Expense, { IExpense } from "../models/expenses.model";

class LogsRepository {
  async createLogs(data: Partial<IExpense>): Promise<IExpense> {
    return await Expense.create(data);
  }
  async getAll() {
    return await Expense.find();
  }
  async getAllByUser(
    userId: string,
    query: { stDate: Date; endDate: Date; oderby: any }
  ) {
    const objectId = new mongoose.Types.ObjectId(userId);
    return await Expense.find({
      user: objectId,
      deletedAt: null,
      date: {
        $gte: query.stDate,
        $lte: query.endDate,
      },
    })
      .populate("category")
      .sort({ date: query?.oderby })
      .exec();
  }

  async getGroupedByCategory(
    userId: string,
    query: { stDate: Date; endDate: Date; oderby: 1 | -1 }
  ) {
    const objectId = new mongoose.Types.ObjectId(userId);

    return await Expense.aggregate([
      {
        $match: {
          user: objectId,
          deletedAt: null,
          date: {
            $gte: query.stDate,
            $lte: query.endDate,
          },
        },
      },
      {
        $group: {
          _id: "$category", // group by category
          totalAmount: { $sum: "$amount" }, // รวม amount
          count: { $sum: 1 }, // นับจำนวนรายการ
          expenses: { $push: "$$ROOT" }, // เก็บรายการทั้งหมด
        },
      },
      {
        $sort: { totalAmount: query.oderby }, // เรียงตาม totalAmount
      },
      {
        $lookup: {
          from: "categories", // collection ชื่อ categories
          localField: "_id",
          foreignField: "_id",
          as: "categoryInfo",
        },
      },
      {
        $unwind: "$categoryInfo",
      },
    ]);
  }
  async getLogsById(id: string): Promise<IExpense[] | null> {
    const objectId = new mongoose.Types.ObjectId(id);
    return await Expense.findOne({
      _id: objectId,
      deletedAt: null,
    });
  }
  async updateLogs(id: string, updateData: Partial<IExpense>) {
    return await Expense.findByIdAndUpdate(id, updateData, { new: true });
  }
  async softDelete(id: string) {
    const objectId = new mongoose.Types.ObjectId(id);
    return await Expense.findOneAndUpdate(
      { _id: objectId, deletedAt: null },
      { deletedAt: new Date() },
      { new: true }
    );
  }
}

export default new LogsRepository();
