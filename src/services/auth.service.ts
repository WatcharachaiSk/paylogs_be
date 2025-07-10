import * as jwt from "jsonwebtoken";
import { CreateUser, IUser } from "../models/user.model";
import User from "../models/user.model";
import userRepository from "../repositories/user.repository";
import * as _ from "lodash";
import { bcryptCompare, bcryptHash } from "../utils/bcryptData";
import { OAuth2Client } from "google-auth-library";
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const JWT_SECRET = process.env.JWT_SECRET || "dev-key";

export class AuthService {
  //   static async hashPassword(password: string): Promise<string> {
  //     return await bcrypt.hash(password, 10);
  //   }
  //   static async comparePassword(password: string, hash: string): Promise<boolean> {
  //     return await bcrypt.compare(password, hash);
  //   }

  static generateToken(id: string, email: string): string {
    return jwt.sign({ id: id, email: email }, JWT_SECRET, {
      expiresIn: "1d",
    });
  }

  static verifyToken(token: string): any {
    return jwt.verify(token, JWT_SECRET);
  }

  async login(email: string, password: string) {
    const user = await userRepository.getUserByEmail(email);
    if (_.isEmpty(user)) {
      return { status: 404, message: "User not found" };
    }
    const isComparePassword = await bcryptCompare(password, user.password);
    if (!isComparePassword) {
      return { status: 401, message: "Invalid email or password" };
    }
    if (!_.isEmpty(user)) {
      const { password, ...response } = user.toObject();
      response.token = AuthService.generateToken(user.id, user.email);
      return response;
    }
  }
  async loginGoogle(token: string) {
    try {
      const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID,
      });

      const payload = ticket.getPayload();

      if (!payload || !payload.email) {
        return { status: 400, message: "Invalid Google token" };
      }

      const { email, name } = payload;
      // return payload;

      let user = await userRepository.getUserByEmail(email);
      if (_.isEmpty(user)) {
        const payloadCreateUser: CreateUser = {
          name: payload?.name ?? "",
          email: payload?.email ?? "",
          password: await bcryptHash(
            `${payload?.given_name}${payload?.family_name}`
          ),
        };
        user = await userRepository.createUser(payloadCreateUser);
      }
      if (!_.isEmpty(user)) {
        const { password, ...response } = user.toObject();
        response.token = AuthService.generateToken(user.id, user.email);
        return response;
      }
    } catch (error) {
      return {
        status: 500,
        message: "Internal Server Error" + _.toString(error),
      };
    }
  }
}

export default new AuthService();
