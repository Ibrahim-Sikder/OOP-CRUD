// src/models/user.model.ts
import mongoose, { Document, Model } from "mongoose";
import bcrypt from "bcryptjs";

export interface IUserDoc extends Document {
  name: string;
  email: string;
  password: string;
  role: string;
  comparePassword(candidate: string): Promise<boolean>;
}

const userSchema = new mongoose.Schema<IUserDoc>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    role: { type: String, default: "user" },
  },
  { timestamps: true }
);

// Hash password before save
userSchema.pre<IUserDoc>("save", async function (next) {
  const user = this;
  if (!user.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  next();
});

userSchema.methods.comparePassword = async function (candidate: string) {
  const user = this as IUserDoc;
  return bcrypt.compare(candidate, user.password);
};

export const UserModel: Model<IUserDoc> = mongoose.model<IUserDoc>("User", userSchema);
