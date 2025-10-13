import { Schema, model, Document } from "mongoose";
import bcrypt from "bcryptjs";
import { Role } from "./user.interface";

export interface IUserModel extends Document {
  name: string;
  email: string;
  password: string;
  role: Role;
  otp?: string | null;
  otpExpires?: Date | null;
  currentToken?: string | null;
  activeDeviceId?: string | null;
  comparePassword(password: string): Promise<boolean>;
}

const userSchema = new Schema<IUserModel>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true, index: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["admin", "teacher", "student", "parent"], default: "student" },
    otp: { type: String, default: null },
    otpExpires: { type: Date, default: null },
    currentToken: { type: String, default: null },
    activeDeviceId: { type: String, default: null },
  },
  { timestamps: true }
);

userSchema.pre<IUserModel>("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.comparePassword = function (password: string) {
  return bcrypt.compare(password, this.password);
};

export const UserModel = model<IUserModel>("User", userSchema);
