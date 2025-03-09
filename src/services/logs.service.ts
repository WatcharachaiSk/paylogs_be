import { IExpense } from "../models/expenses.model";
import LogsRepository from "../repositories/logs.repository";

class LogsService {
  async create(data: Partial<IExpense>) {
    const result = await LogsRepository.createLogs(data);
    return result;
  }
  async getAll() {
    const Logs = await LogsRepository.getAll();
    return Logs;
  }
}

export default new LogsService();
