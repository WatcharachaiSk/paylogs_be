import * as bcrypt from "bcrypt";
import { CostFactor } from "./constant/bcrypt.constant";

export const bcryptHash = async (data: string) => {
  return await bcrypt.hash(data, CostFactor);
};

export const bcryptCompare = async (data: string, hash: string) => {
  return await bcrypt.compare(data, hash);
};
