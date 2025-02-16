import { Request, Response } from "express";
import AuthService from "../services/auth.service";
import * as _ from "lodash";

class AuthController {
  async login(req: Request, res: Response) {
    const { email, password } = req.body;
    try {
      const result = await AuthService.login(email, password);

      //   if (result.status === 400) {
      //     res.status(400).json({ message: result.message });
      //     return;
      //   }

      res.status(201).json(result);
      return;
    } catch (error: any) {
      res
        .status(500)
        .json({ message: error?.message || "Internal Server Error" });
      return;
    }
  }
}

export default new AuthController();
