import { asyncHandler } from "../middleware/asyncHandler";
import { TeacherService } from "../services/TeacherService";

export const createTeacher = asyncHandler(async (req, res) => {
  const teacher = await TeacherService.create(req.body);
  res.status(201).json({
    success: true,
    message: "Teacher create successfylly !",
    data: teacher,
  });
});
