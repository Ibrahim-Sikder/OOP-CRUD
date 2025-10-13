export type Role = "admin" | "teacher" | "student" | "parent";

export interface IUserDTO {
  name: string;
  email: string;
  password: string;
  role?: Role;
}
