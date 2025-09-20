// src/controllers/AuthController.ts
import { Request, Response } from "express";
import { AuthService } from "../services/AuthService";
import { asyncHandler } from "../middleware/asyncHandler";
import { User } from "../models/User";

const authService = new AuthService();

export class AuthController {
  // Use asyncHandler wrapper when exporting to routes so exceptions go to errorHandler
  public static register = asyncHandler(async (req: Request, res: Response) => {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password) {
      throw new Error("name, email and password are required");
    }
    const user = User.create(name, email, password, role ?? "user");
    const created = await authService.register(user);
    return res.status(201).json({ status: "success", user: created });
  });

  public static login = asyncHandler(async (req: Request, res: Response) => {
    const { email, password } = req.body;
    if (!email || !password) throw new Error("email and password are required");

    const token = await authService.login(email, password);
    return res.json({ status: "success", token });
  });

  public static me = asyncHandler(async (req: Request, res: Response) => {
    const user = (req as any).user;
    if (!user) throw new Error("Unauthorized");
    const me = await authService.getById(user.id);
    return res.json({ status: "success", user: me });
  });
}
