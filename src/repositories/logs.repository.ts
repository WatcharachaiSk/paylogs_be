import mongoose from "mongoose";
import Expense, { IExpense } from "../models/expenses.model";

class LogsRepository {
  async createLogs(data: Partial<IExpense>): Promise<IExpense> {
    return await Expense.create(data);
  }
  async getAll() {
    return await Expense.find();
  }
  async getAllByUser(userId: string) {
    const objectId = new mongoose.Types.ObjectId(userId);
    return await Expense.find({
      user: objectId,
      deletedAt: null,
    })
      .populate("category")
      .exec();
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
