// src/routes/authRoutes.ts
import { Router } from "express";
import { AuthController } from "../controller/AuthController";

const authRoutes = Router();

authRoutes.post("/register", AuthController.register);
authRoutes.post("/login", AuthController.login);
authRoutes.get("/me", AuthController.me); // this route should be protected at app-level or route-level

export default authRoutes ;
