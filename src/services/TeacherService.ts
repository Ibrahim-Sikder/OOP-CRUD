import Teacher , { ITeacher } from "../models/teacher.model";

export class TeacherService {
  // ✅ Create
  public static async create(data: Partial<ITeacher>) {
    const teacher = new Teacher(data);
    return teacher.save();
  }

  // ✅ Get All
  public static async getAll() {
    return Teacher.find();
  }

  // ✅ Get By ID
  public static async getById(id: string) {
    return Teacher.findById(id);
  }

  // ✅ Update
  public static async update(id: string, data: Partial<ITeacher>) {
    return Teacher.findByIdAndUpdate(id, data, { new: true });
  }

  // ✅ Delete
  public static async delete(id: string) {
    return Teacher.findByIdAndDelete(id);
  }
}
