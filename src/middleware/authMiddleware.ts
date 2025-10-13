
import { Request, Response, NextFunction } from "express";
import { verifyAccessToken } from "../utils/jwt";
import { UserService } from "../modules/user/user.service";
const userService = new UserService();

export const authMiddleware = (roles?: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const header = req.headers.authorization;
      if (!header) return res.status(401).json({ success: false, message: "No authorization header" });

      const token = header.split(" ")[1];
      if (!token) return res.status(401).json({ success: false, message: "Token missing" });

      const decoded: any = verifyAccessToken(token);
      if (!decoded) return res.status(401).json({ success: false, message: "Invalid token" });

      // single-device enforcement: check that this token is user's currentToken
      const user = await userService.validateToken(token);
      if (!user) return res.status(401).json({ success: false, message: "Session invalidated (logged in on another device?)" });

      // role check if provided
      if (roles && roles.length > 0 && !roles.includes((user.role as string))) {
        return res.status(403).json({ success: false, message: "Forbidden" });
      }

      // attach user
      (req as any).user = user;
      next();
    } catch (err: any) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }
  };

};
