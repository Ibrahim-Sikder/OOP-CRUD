// src/routes/noteRoutes.ts
import { Router } from "express";
import { NoteController } from "../controller/NoteController";
import { authenticate } from "../middleware/authMiddleware";

const noteRoutes = Router();

// apply authenticate to all note routes
noteRoutes.use(authenticate);

noteRoutes.post("/", NoteController.create);
noteRoutes.get("/", NoteController.list);
noteRoutes.get("/:id", NoteController.getOne);
noteRoutes.put("/:id", NoteController.update);
noteRoutes.delete("/:id", NoteController.remove);

export default noteRoutes;
