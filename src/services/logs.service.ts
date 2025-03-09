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
  async getAllByUser(userId: string) {
    const Logs = await LogsRepository.getAllByUser(userId);
    return Logs;
  }
  async getById(id: string) {
    const Logs = await LogsRepository.getLogsById(id);
    return Logs;
  }
}

export default new LogsService();
