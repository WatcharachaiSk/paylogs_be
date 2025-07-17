import { IExpense } from "../models/expenses.model";
import LogsRepository from "../repositories/logs.repository";
import * as _ from "lodash";

class LogsService {
  async create(data: Partial<IExpense>) {
    const result = await LogsRepository.createLogs(data);
    return result;
  }
  async getAll() {
    const Logs = await LogsRepository.getAll();
    return Logs;
  }
  async getDashboard(
    userId: string,
    query: { stDate: Date; endDate: Date; oderby: any }
  ) {
    const Logs = await LogsRepository.getGroupedByCategory(userId, query);
    console.log("query is ", query);
    
    if (!_.isEmpty(Logs)) {
      const res = {
        data: Logs,
        sumAmount: _.sumBy(Logs, "totalAmount"),
      };
      return res;
    }
    return Logs;
  }
  async getAllByUser(
    userId: string,
    query: { stDate: Date; endDate: Date; oderby: any }
  ) {
    const Logs = await LogsRepository.getAllByUser(userId, query);
    if (!_.isEmpty(Logs)) {
      const res = {
        data: Logs,
        sumAmount: _.sumBy(Logs, "amount"),
      };
      return res;
    }
    return Logs;
  }
  async getById(id: string) {
    const Logs = await LogsRepository.getLogsById(id);
    return Logs;
  }
  async update(id: string, data: Partial<IExpense>) {
    const result = await LogsRepository.updateLogs(id, data);
    return result;
  }
  async softDelete(id: string) {
    const result = await LogsRepository.softDelete(id);
    console.log("result is ", result);

    return result;
  }
}

export default new LogsService();
