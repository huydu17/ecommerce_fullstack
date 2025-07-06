import { Request, Response } from 'express';
import HTTP_STATUS from 'http-status-codes';
import { IUserDocument } from 'src/interfaces/user.interface';
import { userService } from 'src/services/db/user.service';

class UserController {
  public async getMe(req: Request, res: Response): Promise<void> {
    const user: IUserDocument = await userService.getMe(req.currentUser!);
    res.status(HTTP_STATUS.OK).json({
      message: 'Lấy người dùng thành công',
      data: user
    });
  }
  public async get(req: Request, res: Response): Promise<void> {
    const user: IUserDocument = await userService.get(req.params.id);
    res.status(HTTP_STATUS.OK).json({
      message: 'Lấy người dùng thành công',
      data: user
    });
  }
  public async getAll(req: Request, res: Response): Promise<void> {
    const user: IUserDocument[] = await userService.getAll();
    res.status(HTTP_STATUS.OK).json({
      message: 'Lấy người dùng thành công',
      length: user.length,
      data: user
    });
  }
  public async delete(req: Request, res: Response): Promise<void> {
    await userService.delete(req.params.id);
    res.status(HTTP_STATUS.OK).json({
      message: 'Xoá người dùng thành công'
    });
  }
  public async updateInfo(req: Request, res: Response): Promise<void> {
    const user: IUserDocument = await userService.updateInfo(req.body, req.currentUser!);
    res.status(HTTP_STATUS.OK).json({
      message: 'Cập nhật người dùng thành công',
      data: user
    });
  }
  public async updateUserByAdmin(req: Request, res: Response): Promise<void> {
    await userService.updateUserByAdmin(req.params.id, req.body);
    res.status(HTTP_STATUS.OK).json({
      message: 'Cập nhật người dùng thành công'
    });
  }
}
export const userController: UserController = new UserController();
