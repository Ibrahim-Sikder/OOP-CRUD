// src/services/NoteService.ts

import { Note } from "../models/Note";
import { INoteDoc, NoteModel } from "../models/note.model";
import { ApiError } from "../utils/ApiError";

export class NoteService {
  private noteModel = NoteModel;

  public async create(note: Note) {
    const created = await this.noteModel.create({
      title: note.title,
      content: note.content,
      owner: note.owner,
    });
    return this.mapToDomain(created);
  }

  public async findByUser(userId: string) {
    const docs = await this.noteModel.find({ owner: userId }).sort({ createdAt: -1 });
    return docs.map((d) => this.mapToDomain(d));
  }

  public async findById(id: string) {
    const doc = await this.noteModel.findById(id);
    if (!doc) throw ApiError.NotFound("Note not found");
    return this.mapToDomain(doc);
  }

  public async update(id: string, userId: string, data: Partial<Note>) {
    const doc = await this.noteModel.findById(id);
    if (!doc) throw ApiError.NotFound("Note not found");
    if (doc.owner.toString() !== userId) throw ApiError.Forbidden("You can't update this note");

    doc.title = data.title ?? doc.title;
    doc.content = data.content ?? doc.content;
    const updated = await doc.save();
    return this.mapToDomain(updated);
  }

  public async remove(id: string, userId: string) {
    const doc = await this.noteModel.findById(id);
    if (!doc) throw ApiError.NotFound("Note not found");
    if (doc.owner.toString() !== userId) throw ApiError.Forbidden("You can't delete this note");

    await this.noteModel.deleteOne({ _id: id });
    return { success: true };
  }

  private mapToDomain(doc: INoteDoc) {
    const n = {
      id: doc._id.toString(),
      title: doc.title,
      content: doc.content,
      owner: doc.owner.toString(),
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
    };
    return n;
  }
}
