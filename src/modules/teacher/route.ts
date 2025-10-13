// teacher.route.ts
import { Router } from "express";
import { authMiddleware } from "../../middleware/authMiddleware";
import { TeacherController } from "./controller";

const teacherRoutes = Router();

// Create teacher - admin only
teacherRoutes.post("/", authMiddleware(["admin"]), TeacherController.create);

// list and read - admin and teacher (teacher sees own via frontend check)
teacherRoutes.get("/", authMiddleware(["admin"]), TeacherController.list);
teacherRoutes.get("/:id", authMiddleware(["admin", "teacher"]), TeacherController.getById);

// update & delete - admin only
teacherRoutes.put("/:id", authMiddleware(["admin"]), TeacherController.update);
teacherRoutes.delete("/:id", authMiddleware(["admin"]), TeacherController.remove);

export default  teacherRoutes;
