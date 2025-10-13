import { UserModel, IUser } from "../models/user.model";

export class UserRepository {
  async createUser(data: Partial<IUser>): Promise<IUser> {
    return UserModel.create(data);
  }

  async findByEmail(email: string): Promise<IUser | null> {
    return UserModel.findOne({ email });
  }

  async findById(id: string): Promise<IUser | null> {
    return UserModel.findById(id);
  }

  async updateUser(id: string, data: Partial<IUser>): Promise<IUser | null> {
    return UserModel.findByIdAndUpdate(id, data, { new: true });
  }

  async clearActiveSession(id: string): Promise<void> {
    await UserModel.findByIdAndUpdate(id, {
      activeToken: null,
      activeDeviceId: null,
    });
  }
}
