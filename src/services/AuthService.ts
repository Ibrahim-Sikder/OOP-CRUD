
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { IUserDoc, UserModel } from "../models/user.model";
import { User } from "../models/User";
import { ApiError } from "../utils/ApiError";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || "secretkey";
const JWT_EXPIRES = process.env.JWT_EXPIRES_IN || "1h";

export class AuthService {
  // private property encapsulates persistence model
  private userModel = UserModel;

  // public method - used by controller
  public async register(user: User): Promise<User> {
    // Check exists
    const existing = await this.userModel.findOne({ email: user.email });
    if (existing) throw ApiError.BadRequest("Email already registered");

    // Persist
    const created = await this.userModel.create({
      name: user.name,
      email: user.email,
      password: user.getPassword(), // using getter (we discussed encapsulation)
      role: user.role,
    });

    return this.mapToDomain(created);
  }

  public async login(email: string, password: string): Promise<any> {
    const found = await this.userModel.findOne({ email }) as IUserDoc;
    if (!found) throw ApiError.Unauthorized("Invalid credentials");

    const match = await found.comparePassword(password);
    if (!match) throw ApiError.Unauthorized("Invalid credentials");

    const payload = { id: found._id.toString(), email: found.email, role: found.role };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES as any });
    return token;
  }

  public async getById(id: string): Promise<User | null> {
    const found = await this.userModel.findById(id).select("-password");
    if (!found) return null;
    return this.mapToDomain(found as IUserDoc);
  }

  // private helper - mapping persistence doc -> domain class
  private mapToDomain(doc: IUserDoc): User {
    const u = new User(doc.name, doc.email, ""); // password intentionally empty
    u.id = doc._id.toString();
    u.role = doc.role;
    return u;
  }

  // static helper - demonstrates static usage (no need to create instance)
  public static verifyToken(token: string) {
    try {
      const secret = process.env.JWT_SECRET || "secretkey";
      return jwt.verify(token, secret);
    } catch {
      return null;
    }
  }
}
