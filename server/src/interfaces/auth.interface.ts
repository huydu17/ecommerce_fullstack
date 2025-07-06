import { Document, ObjectId } from 'mongoose';

export interface IRegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  avatar?: string;
  googleId?: string;
}
export interface ILoginData {
  emailOrUsername: string;
  password: string;
}

export interface IChangePassword {
  oldPassword?: string;
  newPassword: string;
}

export interface ITokenDocument extends Document {
  userId: string | ObjectId;
  refreshToken: string;
  passwordResetToken?: string;
  passwordResetTokenExpiresAt?: number;
  verifyToken?: string;
  verifyTokenExpiresAt?: number;
}

export interface IRefreshToken {
  refreshToken: string;
}
