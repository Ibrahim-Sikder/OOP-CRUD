// teacher.controller.ts
import { Request, Response } from "express";
import { TeacherService } from "./service";

const svc = new TeacherService();

export class TeacherController {
  static async create(req: Request, res: Response) {
    try {
      // Admin-only route (enforced in route)
      const payload = req.body;
      const result = await svc.createTeacher(payload);
      return res.status(201).json({ success: true, ...result });
    } catch (err: any) {
      return res.status(400).json({ success: false, message: err.message });
    }
  }

  static async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const doc = await svc.getTeacherById(id);
      return res.json({ success: true, data: doc });
    } catch (err: any) {
      return res.status(404).json({ success: false, message: err.message });
    }
  }

  static async list(req: Request, res: Response) {
    try {
      const docs = await svc.listTeachers();
      return res.json({ success: true, data: docs });
    } catch (err: any) {
      return res.status(400).json({ success: false, message: err.message });
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const update = req.body;
      const updated = await svc.updateTeacherProfile(id, update);
      return res.json({ success: true, data: updated });
    } catch (err: any) {
      return res.status(400).json({ success: false, message: err.message });
    }
  }

  static async remove(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const result = await svc.deleteTeacherProfile(id);
      return res.json({ success: true, ...result });
    } catch (err: any) {
      return res.status(400).json({ success: false, message: err.message });
    }
  }
}
