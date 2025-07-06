import { Document } from 'mongoose';
import mongoose from 'mongoose';
import { Role } from 'src/enums/role.enum';

export interface IUserDocument extends Document {
  _id: mongoose.Types.ObjectId;
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  password: string;
  avatar: string;
  role: Role;
  phoneNumber: string;
  apartment: string;
  ward: string;
  district: string;
  province: string;
  googleId?: string;
  comparePassword(password: string): Promise<boolean>;
}

export interface IUpdateInfo {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  apartment: string;
  ward: string;
  district: string;
  province: string;
}

export interface IUpdateUser {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  role: boolean;
  password?: string;
}
