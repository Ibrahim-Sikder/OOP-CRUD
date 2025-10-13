import mongoose, { Schema } from "mongoose";
import { IStudent } from "./student.interface";

const studentSchema = new Schema<IStudent>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    roll: { type: String, required: true, unique: true },
    classId: { type: Schema.Types.ObjectId, ref: "Class", required: true },
    section: { type: String },
    gender: { type: String, enum: ["Male", "Female", "Other"], required: true },
    dateOfBirth: { type: Date },
    address: { type: String },
    parentName: { type: String },
    phone: { type: String },
    admissionDate: { type: Date, default: Date.now },
    status: { type: String, enum: ["Active", "Inactive"], default: "Active" },
  },
  { timestamps: true }
);

export const StudentModel = mongoose.model<IStudent>("Student", studentSchema);
