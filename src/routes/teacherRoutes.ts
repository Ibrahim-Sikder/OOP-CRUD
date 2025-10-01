import { Router } from "express";
import { createTeacher } from "../controller/teacher.controller";

const teacherRoutes = Router();

// ✅ Create Teacher
teacherRoutes.post("/", createTeacher);

// // ✅ Get All Teachers
// router.get("/", getAllTeachers);

// // ✅ Get Teacher By ID
// router.get("/:id", getTeacherById);

// // ✅ Update Teacher
// router.put("/:id", updateTeacher);

// // ✅ Delete Teacher
// router.delete("/:id", deleteTeacher);

export default teacherRoutes;
