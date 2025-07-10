import User, { CreateUser, IUser } from "../models/user.model";

class UserRepository {
  async createUser(data: CreateUser): Promise<IUser> {
    return await User.create(data);
  }

  async getAll(): Promise<IUser[] | null> {
    return await User.find({ deletedAt: null }).select("-password");
  }

  async getUserByEmail(email: string): Promise<IUser | null> {
    return await User.findOne({ email, deletedAt: null });
  }

  async updateUser(
    email: string,
    updateData: Partial<IUser>
  ): Promise<IUser | null> {
    return await User.findOneAndUpdate({ email, deletedAt: null }, updateData, {
      new: true,
    }).select("-password");
  }

  async softDelete(email: string): Promise<IUser | null> {
    return await User.findOneAndUpdate(
      { email, deletedAt: null },
      { deletedAt: new Date() },
      { new: true }
    );
  }
}

export default new UserRepository();
