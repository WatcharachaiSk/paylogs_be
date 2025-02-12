import { Request, Response, NextFunction } from "express";
import { AuthService } from "../services/auth.service";

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.header("Authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ message: "Unauthorized: No Token Provided" });
    return;
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = AuthService.verifyToken(token);
    (req as any).user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Unauthorized: Invalid Token" });
    return;
  }
};
