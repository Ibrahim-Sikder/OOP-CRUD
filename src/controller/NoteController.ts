// src/controllers/NoteController.ts
import { Request, Response } from "express";
import { NoteService } from "../services/NoteService";
import { asyncHandler } from "../middleware/asyncHandler";
import { Note } from "../models/Note";

const noteService = new NoteService();

export class NoteController {
  public static create = asyncHandler(async (req: Request, res: Response) => {
    const user = (req as any).user;
    if (!user) throw new Error("Unauthorized");

    const { title, content } = req.body;
    if (!title || !content) throw new Error("title and content are required");

    const noteDomain = Note.create(title, content, user.id);
    const created = await noteService.create(noteDomain);
    return res.status(201).json({ status: "success", note: created });
  });

  public static list = asyncHandler(async (req: Request, res: Response) => {
    const user = (req as any).user;
    const notes = await noteService.findByUser(user.id);
    return res.json({ status: "success", notes });
  });

  public static getOne = asyncHandler(async (req: Request, res: Response) => {
    const user = (req as any).user;
    const note = await noteService.findById(req.params.id);
    if (note.owner !== user.id) throw new Error("Forbidden");
    return res.json({ status: "success", note });
  });

  public static update = asyncHandler(async (req: Request, res: Response) => {
    const user = (req as any).user;
    const updated = await noteService.update(req.params.id, user.id, req.body);
    return res.json({ status: "success", note: updated });
  });

  public static remove = asyncHandler(async (req: Request, res: Response) => {
    const user = (req as any).user;
    const r = await noteService.remove(req.params.id, user.id);
    return res.json(r);
  });
}
