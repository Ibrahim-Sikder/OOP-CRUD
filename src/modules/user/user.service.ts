import { UserRepository } from "./user.repository";
import { IUserDTO } from "./user.interface";
import { generateOtp } from "../../utils/generateOtp";
import { sendEmail } from "../../utils/sendEmail";
import { signAccessToken } from "../../utils/jwt";

export class UserService {
  private repo = new UserRepository();
  async register(payload: any) {
    const existing = await this.repo.findByEmail(payload.email);
    if (existing) throw new Error("Email already registered");

    const otp = generateOtp(6);
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000); 

    const user = await this.repo.create({
      ...payload,
      otp,
      otpExpires,
    });


    await sendEmail(user.email, "Your OTP code", `Your OTP is: ${otp}`);

    return { message: "Registration successful. OTP sent to email.", email: user.email };
  }


  async verifyOtpAndLogin(email: string, otp: string, deviceId: string) {
    const user = await this.repo.findByEmail(email);
    if (!user) throw new Error("User not found");

    if (!user.otp || !user.otpExpires) throw new Error("No OTP requested");
    if (new Date() > user.otpExpires) throw new Error("OTP expired");
    if (user.otp !== otp) throw new Error("Invalid OTP");

    // Generate token payload
    const payload = { id: user._id, role: user.role, email: user.email };

    const token = signAccessToken(payload);

    await this.repo.updateById(user._id.toString(), { currentToken: token, activeDeviceId: deviceId, otp: null, otpExpires: null });

    return { token, user: { id: user._id, name: user.name, email: user.email, role: user.role } };
  }

  async loginRequestOtp(email: string, password: string) {
    const user = await this.repo.findByEmail(email);
    if (!user) throw new Error("Invalid credentials");

    const match = await user.comparePassword(password);
    if (!match) throw new Error("Invalid credentials");

    const otp = generateOtp(6);
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000);

    await this.repo.updateById(user._id.toString(), { otp, otpExpires });

    await sendEmail(user.email, "Your Login OTP", `Your OTP is: ${otp}`);

    return { message: "OTP sent to your email" };
  }

  async logoutByUserId(userId: string) {
    await this.repo.clearSessionById(userId);
    return { message: "Logged out" };
  }


  async validateToken(token: string) {
    const user = await this.repo.findByToken(token);
    return user;
  }

  async forceInvalidateForUser(userId: string) {
    await this.repo.clearSessionById(userId);
  }
}
