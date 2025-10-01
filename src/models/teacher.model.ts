import { Schema, model, Document } from "mongoose";

export interface ITeacher extends Document {
  name: string;
  subject: string;
  email: string;
}

const teacherSchema = new Schema<ITeacher>(
  {
    name: { type: String, required: true },
    subject: { type: String, required: true },
    email: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

const Teacher = model<ITeacher>("Teacher", teacherSchema);
export default Teacher;
