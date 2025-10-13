import { generateOtp } from "../../utils/generateOtp";
import { sendEmail } from "../../utils/sendEmail";
import { UserRepository } from "../user/user.repository";
import { IUserDTO } from "../user/user.interface";
import { v4 as uuidv4 } from "uuid";
import { TeacherRepository } from "./repository";
import { ITeacherCreateDTO } from "./interface";

export class TeacherService {
  private repo = new TeacherRepository();
  private userRepo = new UserRepository();

  async createTeacher(payload: ITeacherCreateDTO) {
    const existingUser = await this.userRepo.findByEmail(payload.email);
    if (existingUser) throw new Error("Email already in use");
    const tempPassword = this.generateTempPassword();
    const otp = generateOtp(6);
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000);
    const userPayload: Partial<IUserDTO> = {
      name: payload.name,
      email: payload.email,
      password: tempPassword,
      role: "teacher",
    };

    const user = await this.userRepo.create(userPayload as any);

    const profile = await this.repo.createProfile({
      user: user._id,
      employeeId: this.generateEmployeeId(),
      phone: payload.phone,
      subjects: payload.subjects || [],
      address: payload.address,
      joiningDate: payload.joiningDate ? new Date(payload.joiningDate) : null,
    } as any);
    // await this.userRepo.updateUser(user._id.toString(), {
    //   otp,
    //   otpExpires,
    //   currentToken: null,
    // } as any);
    const emailText = `
Hello ${user.name},
An account has been created for you on School ERP as Teacher.

Please verify your account using the following OTP (valid 10 minutes): ${otp}

Temporary password: ${tempPassword}

Steps:
1) Verify OTP at: <your-frontend-url>/verify-otp
2) After verification, change your temporary password to a secure password.

If you didn't request this, contact your admin.

Regards,
School ERP Team
    `;
    await sendEmail(user.email, "Your Teacher Account Created — Verify OTP", emailText);

    return {
      message: "Teacher created. OTP & temporary password sent to teacher email.",
      userId: user._id,
      profileId: profile._id,
    };
  }

  async getTeacherById(id: string) {
    const doc = await this.repo.findById(id);
    if (!doc) throw new Error("Teacher not found");
    return doc;
  }

  async listTeachers() {
    return this.repo.listAll({}, { sort: { createdAt: -1 } });
  }

  async updateTeacherProfile(id: string, update: Partial<any>) {
    return this.repo.updateProfile(id, update);
  }

  async deleteTeacherProfile(id: string) {
    const profile = await this.repo.findById(id);
    if (!profile) throw new Error("Teacher not found");
    // remove linked user as well
    await this.userRepo.findByEmail((profile.user as any).email).then(async (u) => {
      // if (u) {
      //   await this.userRepo.updateUser(u._id.toString(), {});
      // }
    });
    await this.repo.deleteProfile(id);
    return { message: "Teacher deleted" };
  }

  private generateEmployeeId() {
    return `TCHR-${uuidv4().split("-")[0].toUpperCase()}`;
  }

  private generateTempPassword() {
    return Math.random().toString(36).slice(-8) + "Aa1!";
  }
}
