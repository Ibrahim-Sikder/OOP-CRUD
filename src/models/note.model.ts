// src/models/note.model.ts
import mongoose, { Document, Model } from "mongoose";

export interface INoteDoc extends Document {
  title: string;
  content: string;
  owner: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const noteSchema = new mongoose.Schema<INoteDoc>(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

export const NoteModel: Model<INoteDoc> = mongoose.model<INoteDoc>("Note", noteSchema);
