import jwt, { SignOptions, Secret, JwtPayload } from "jsonwebtoken";

const JWT_SECRET: Secret = process.env.JWT_SECRET as Secret;
const ACCESS_EXPIRES = process.env.JWT_EXPIRES_IN as any;

// Sign Access Token
export const signAccessToken = (payload: any): any => {
  const options: SignOptions = { expiresIn: ACCESS_EXPIRES };
  return jwt.sign(payload, JWT_SECRET, options);
};

// Verify Access Token
export const verifyAccessToken = (token: any): JwtPayload | null => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
    return decoded;
  } catch (error) {
    return null;
  }
};
