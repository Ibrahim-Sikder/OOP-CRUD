// teacher.interface.ts
export interface ITeacherCreateDTO {
  name: string;
  email: string;
  phone?: string;
  subjects?: string[]
  address?: string;
  joiningDate?: string;
}
