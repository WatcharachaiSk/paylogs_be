import Expense, { IExpense } from "../models/expenses.model";

class LogsRepository {
  async createLogs(data: Partial<IExpense>): Promise<IExpense> {
    return await Expense.create(data);
  }
  async getAll() {
    return await Expense.find();
  }
  async getLogsByEmail(email: string): Promise<IExpense[] | null> {
    return await Expense.findOne({
      email,
      deletedAt: null,
    });
  }
  async updateLogs(id: string, updateData: Partial<IExpense>) {
    return await Expense.findByIdAndUpdate({ id, updateData }, { new: true });
  }
  async softDelete(id: string) {
    return await Expense.findByIdAndDelete(
      { id, deletedAt: null },
      { deletedAt: new Date() }
    );
  }
}

export default new LogsRepository();
