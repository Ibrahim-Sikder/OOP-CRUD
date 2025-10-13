import { Router } from "express";
import { StudentController } from "./student.controller";
import { authMiddleware } from "../../middleware/authMiddleware";

const studentRouter = Router();

studentRouter.post("/", authMiddleware(["admin"]), StudentController.create);
studentRouter.get("/", authMiddleware(["admin", "teacher"]), StudentController.getAll);
studentRouter.get("/:id", authMiddleware(["admin", "teacher"]), StudentController.getOne);
studentRouter.put("/:id", authMiddleware(["admin"]), StudentController.update);
studentRouter.delete("/:id", authMiddleware(["admin"]), StudentController.delete);

export default studentRouter;
