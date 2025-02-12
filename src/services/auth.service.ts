import * as jwt from "jsonwebtoken";
import { IUser } from "../models/user.model";
import User from "../models/user.model";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

export class AuthService {
  //   static async hashPassword(password: string): Promise<string> {
  //     return await bcrypt.hash(password, 10);
  //   }
  //   static async comparePassword(password: string, hash: string): Promise<boolean> {
  //     return await bcrypt.compare(password, hash);
  //   }

  static generateToken(user: IUser): string {
    return jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, {
      expiresIn: "30d", // Token ใช้ได้ 7 วัน
    });
  }

  static verifyToken(token: string): any {
    return jwt.verify(token, JWT_SECRET);
  }
}
