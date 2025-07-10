import { z } from "zod";

export const loginDto = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(1, "Password is required"),
});

export const loginGoogleDto = z.object({
  token: z.string().min(1, "token is required"),
});
