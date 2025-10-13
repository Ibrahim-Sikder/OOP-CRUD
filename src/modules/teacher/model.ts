// teacher.model.ts
import { Schema, model, Document, Types } from "mongoose";

export interface ITeacherProfile extends Document {
  user: Types.ObjectId;
  employeeId: string;
  phone?: string;
  subjects: string[];
  address?: string;
  joiningDate?: Date | null;
  createdAt?: Date;
  updatedAt?: Date;
}

const TeacherSchema = new Schema<ITeacherProfile>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    employeeId: { type: String, required: true, unique: true, index: true },
    phone: { type: String },
    subjects: { type: [String], default: [] },
    address: { type: String },
    joiningDate: { type: Date, default: null },
  },
  { timestamps: true }
);

export const TeacherProfileModel = model<ITeacherProfile>("TeacherProfile", TeacherSchema);
