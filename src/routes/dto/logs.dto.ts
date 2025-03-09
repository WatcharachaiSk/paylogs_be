import { z } from "zod";

export const createLogsSchema = z.object({
  amount: z.number().min(1, "amount is required"),
  category: z.string().min(1, "category is required"),
  description: z.string().min(1, "description is required"),
  date: z.preprocess((arg) => {
    if (typeof arg === "string" || arg instanceof Date) {
      const date = new Date(arg);
      return isNaN(date.getTime()) ? undefined : date;
    }
    return undefined;
  }, z.date()),
});
