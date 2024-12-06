import { Role } from 'src/features/users/enums/role.enum';
import { IUpdateInfo, IUpdateUser, IUserDocument } from 'src/features/users/interfaces/user.interface';
import { User } from 'src/features/users/models/user.schema';
import { BadRequestException } from 'src/shared/middlewares/globalErrorHandle';
import { UserPayload } from 'src/type';

class UserService {
  public async getMe(currentUser: UserPayload) {
    const user: IUserDocument = (await this.getUserById(`${currentUser.userId}`)) as IUserDocument;
    return user;
  }
  public async getAll() {
    const users: IUserDocument[] = await User.find({});
    return users;
  }
  public async get(userId: string) {
    const user: IUserDocument = await User.findById(userId).select('name firstName lastName email role ');
    return user;
  }
  public async updateInfo(data: IUpdateInfo, currentUser: UserPayload) {
    const { firstName, lastName, phoneNumber, apartment, ward, district, province } = data;
    const user = await this.getUserById(`${currentUser.userId}`);
    if (!user) {
      throw new BadRequestException('Người dùng không tồn tại');
    }
    user.firstName = firstName || user.firstName;
    user.lastName = lastName || user.lastName;
    user.phoneNumber = phoneNumber || user.phoneNumber;
    user.apartment = apartment || user.apartment;
    user.ward = ward || user.ward;
    user.district = district || user.district;
    user.province = province || user.province;
    return user as IUserDocument;
  }

  public async updateUserByAdmin(userId: string, data: IUpdateUser) {
    const { firstName, lastName, phoneNumber, role, password } = data;
    const user = await this.getUserById(userId);
    if (!user) {
      throw new BadRequestException('Không tìm thấy người dùng');
    }
    user.firstName = firstName || user.firstName;
    user.lastName = lastName || user.lastName;
    user.phoneNumber = phoneNumber || user.phoneNumber;
    user.role = role ? Role.ADMIN : Role.USER;
    user.password = password || user.password;
    await user.save();
  }
  public async delete(userId: string) {
    await User.findByIdAndDelete(userId);
  }
  public async getUserById(id: string) {
    const user = await User.findById({ _id: id });
    return user;
  }
  public async getUserByEmail(email: string) {
    const user = await User.findOne({ email });
    return user;
  }
  public async getUserByUserName(userName: string) {
    const user = User.findOne({ userName });
    return user;
  }
  public async getUserByEmailOrUsername(emailOrUsername: string) {
    const user = await User.findOne({
      $or: [{ email: emailOrUsername }, { userName: emailOrUsername }]
    }).exec();
    return user;
  }
  public async useStats() {
    const users = await User.find({});
    return users.length;
  }
}
export const userService: UserService = new UserService();
