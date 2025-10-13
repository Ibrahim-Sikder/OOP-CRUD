import { Request, Response } from "express";
import { UserService } from "./user.service";

const svc = new UserService();

export class UserController {
  static async register(req: Request, res: Response) {
    try {
      const { name, email, password, role } = req.body;
      const result = await svc.register({ name, email, password, role });
      return res.status(201).json({ success: true, ...result });
    } catch (err: any) {
      return res.status(400).json({ success: false, message: err.message });
    }
  }

  // login request: user submits email+password -> server sends OTP to email
  static async loginRequest(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const result = await svc.loginRequestOtp(email, password);
      return res.json({ success: true, ...result });
    } catch (err: any) {
      return res.status(400).json({ success: false, message: err.message });
    }
  }

  // verify OTP and log the user in (issue JWT) -> deviceId required
  static async verifyOtpAndLogin(req: Request, res: Response) {
    try {
      const { email, otp, deviceId } = req.body;
      if (!deviceId) return res.status(400).json({ success: false, message: "deviceId required" });
      const result = await svc.verifyOtpAndLogin(email, otp, deviceId);
      return res.json({ success: true, ...result });
    } catch (err: any) {
      return res.status(400).json({ success: false, message: err.message });
    }
  }

  static async logout(req: Request, res: Response) {
    try {
      const user = (req as any).user;
      if (!user) return res.status(401).json({ success: false, message: "Unauthorized" });
      const result = await svc.logoutByUserId(user._id.toString());
      return res.json({ success: true, ...result });
    } catch (err: any) {
      return res.status(400).json({ success: false, message: err.message });
    }
  }
}
