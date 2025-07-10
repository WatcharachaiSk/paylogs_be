import UserRepository from "../repositories/user.repository";
import { CreateUser, IUser } from "../models/user.model";
import { bcryptHash } from "../utils/bcryptData";
import * as _ from "lodash";

class UserService {
  async registerUser(userData: CreateUser) {
    const userExists = await UserRepository.getUserByEmail(userData.email);
    if (userExists) {
      return { status: 400, message: "User already exists" };
    }

    userData.password = await bcryptHash(userData.password);
    const newUser = await UserRepository.createUser(userData);
    if (!_.isEmpty(newUser)) {
      const { password, ...response } = newUser.toObject();
      return { status: 201, data: response };
    }
    return { status: 201, data: newUser };
  }

  async getAll() {
    const users = await UserRepository.getAll();
    return users;
  }

  async getUserByEmail(email: string) {
    const user = await UserRepository.getUserByEmail(email);
    if (!_.isEmpty(user)) {
      const { password, ...response } = user.toObject();
      return response;
    }
    return user;
  }

  async update(email: string, updateData: Partial<IUser>) {
    const user = await UserRepository.updateUser(email, updateData);
    if (!_.isEmpty(user)) {
      const { password, ...response } = user.toObject();
      return response;
    }
    return user;
  }

  async softDelete(email: string) {
    const user = await UserRepository.softDelete(email);
    return user;
  }
}

export default new UserService();
