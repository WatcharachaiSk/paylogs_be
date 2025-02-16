import { Request, Response } from "express";
import UserService from "../services/user.service";
import * as _ from "lodash";
import e = require("express");

class UserController {
  async register(req: Request, res: Response) {
    try {
      const result = await UserService.registerUser(req.body);

      if (result.status === 400) {
        res.status(400).json({ message: result.message });
        return;
      }

      res.status(201).json(result.data);
      return;
    } catch (error: any) {
      res
        .status(500)
        .json({ message: error?.message || "Internal Server Error" });
      return;
    }
  }
  async getAll(req: Request, res: Response) {
    try {
      const users = await UserService.getAll();
      res.status(200).json(users);
      return;
    } catch (error: any) {
      res
        .status(500)
        .json({ message: error?.message || "Internal Server Error" });
      return;
    }
  }

  async getUserByEmail(req: Request, res: Response) {
    try {
      const email = req.query.email as string;
      if (_.isEmpty(email)) {
        res.status(400).json({ message: "Email is required" });
        return;
      }
      const user = await UserService.getUserByEmail(email);
      if (_.isEmpty(user)) {
        res.status(404).json({ message: "User not found" });
        return;
      }
      res.status(200).json(user);
      return;
    } catch (error: any) {
      res
        .status(500)
        .json({ message: error?.message || "Internal Server Error" });
      return;
    }
  }
  async update(req: Request, res: Response) {
    try {
      const { email, name } = req.body;
      const updateUser = await UserService.update(email, { name: name });
      if (_.isEmpty(updateUser)) {
        res.status(404).json({ message: "User not found" });
        return;
      }
      res.status(200).json(updateUser);
      return;
    } catch (error: any) {
      res
        .status(500)
        .json({ message: error?.message || "Internal Server Error" });
      return;
    }
  }
  async softDelete(req: Request, res: Response) {
    try {
      const email = req.body.email as string;
      const user = await UserService.softDelete(email);
      if (_.isEmpty(user)) {
        res.status(404).json({ message: "User not found" });
        return;
      }

      res.status(200).json({ message: "delete success" + req.body.email });
      return;
    } catch (error: any) {
      res
        .status(500)
        .json({ message: error?.message || "Internal Server Error" });
      return;
    }
  }
}

export default new UserController();
