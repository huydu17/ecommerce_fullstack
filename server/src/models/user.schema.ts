import mongoose, { Schema } from 'mongoose';
import { hash, compare } from 'bcryptjs';
import { Role } from 'src/enums/role.enum';
import { IUserDocument } from 'src/interfaces/user.interface';
const SALT_ROUND = 10;
const AVATAR_URL = 'https://res.cloudinary.com/db5xbbdbc/image/upload/v1727270247/images_mtg1mj.jpg';
const userSchema: Schema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    userName: { type: String, unique: true, rerequired: true },
    email: { type: String, unique: true, required: true },
    password: { type: String },
    avatar: {
      type: String,
      default: AVATAR_URL
    },
    role: {
      type: String,
      enum: Role,
      default: Role.USER
    },
    googleId: { type: String, default: '' },
    phoneNumber: { type: String, default: '' },
    apartment: { type: String, default: '' },
    ward: { type: String, default: '' },
    district: { type: String, default: '' },
    province: { type: String, default: '' }
  },
  {
    toJSON: {
      transform(_doc, ret) {
        delete ret.password;
        return ret;
      }
    },
    timestamps: true
  }
);
userSchema.pre('save', async function (this: IUserDocument, next: () => void) {
  const hashedPassword: string = await hash(this.password as string, SALT_ROUND);
  this.password = hashedPassword;
  next();
});
userSchema.methods.comparePassword = async function (password: string) {
  const hashedPassword: string = this.password!;
  return compare(password, hashedPassword);
};
const User = mongoose.model<IUserDocument>('User', userSchema);
export { User };
