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

export const updateLogsSchema = z.object({
  id: z.string().min(1, "id is required"),
  amount: z.number().min(1, "amount is required").optional(),
  category: z.string().min(1, "category is required").optional(),
  description: z.string().min(1, "description is required").optional(),
  date: z
    .preprocess((arg) => {
      if (typeof arg === "string" || arg instanceof Date) {
        const date = new Date(arg);
        return isNaN(date.getTime()) ? undefined : date;
      }
      return undefined;
    }, z.date())
    .optional(),
});

export const daleteLogsSchema = z.object({
  id: z.string().min(1, "id is required"),
});
