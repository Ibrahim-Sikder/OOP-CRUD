import { UserModel, IUserModel } from "./user.model";
import { IUserDTO } from "./user.interface";

export class UserRepository {
  async create(data: Partial<IUserDTO>): Promise<IUserModel> {
    return UserModel.create(data);
  }

  async findByEmail(email: string): Promise<IUserModel | null> {
    return UserModel.findOne({ email }).exec();
  }

  async findById(id: string): Promise<IUserModel | null> {
    return UserModel.findById(id).exec();
  }

  async updateById(id: string, update: Partial<IUserModel>): Promise<IUserModel | null> {
    return UserModel.findByIdAndUpdate(id, update, { new: true }).exec();
  }

  async findByToken(token: string): Promise<IUserModel | null> {
    return UserModel.findOne({ currentToken: token }).exec();
  }

  async clearSessionById(id: string) {
    await UserModel.findByIdAndUpdate(id, { currentToken: null, activeDeviceId: null }).exec();
  }
}
