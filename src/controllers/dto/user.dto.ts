import { z } from "zod";

export const updateUserSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
});

export const deleteUserSchema = z.object({
  email: z.string().email("Invalid email"),
});
