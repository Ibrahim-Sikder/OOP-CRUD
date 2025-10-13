import mongoose, { Document, Schema } from "mongoose";

export interface IClass extends Document {
  name: string;
  section: string;
  teacherId?: mongoose.Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}

const classSchema = new Schema<IClass>(
  {
    name: { type: String, required: true, unique: true },
    section: { type: String, required: true },
    teacherId: { type: Schema.Types.ObjectId, ref: "Teacher", required: false },
  },
  { timestamps: true }
);

export const ClassModel = mongoose.model<IClass>("Class", classSchema);
