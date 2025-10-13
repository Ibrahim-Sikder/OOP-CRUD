import { Document, ObjectId } from "mongoose";

export interface IStudent extends Document {
  name: string;
  email: string;
  roll: string;
  classId: ObjectId;
  section?: string;
  gender: "Male" | "Female" | "Other";
  dateOfBirth?: Date;
  address?: string;
  parentName?: string;
  phone?: string;
  admissionDate?: Date;
  status?: "Active" | "Inactive";
}
