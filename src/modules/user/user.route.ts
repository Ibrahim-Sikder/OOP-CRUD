import { Router } from "express";
import { UserController } from "./user.controller";
import { authMiddleware } from "../../middleware/authMiddleware";

const userRoutes = Router();

userRoutes.post("/register", UserController.register);
userRoutes.post("/login", UserController.loginRequest);
userRoutes.post("/verify-otp", UserController.verifyOtpAndLogin);
userRoutes.post("/logout", authMiddleware(), UserController.logout);

export default userRoutes;
