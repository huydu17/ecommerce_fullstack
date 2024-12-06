import { NextFunction, Request, Response } from 'express';
import { asyncWrapper, BadRequestException } from './globalErrorHandle';
export const upload = asyncWrapper((req: Request, res: Response, next: NextFunction) => {
  if (req.files) {
    let files = Object.values(req.files).flat();
    files.forEach((file) => {
      if (file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/png' && file.mimetype !== 'image/jpg') {
        throw new BadRequestException('Hình ảnh không hợp lệ');
      }
      if (file.size > 1024 * 1024 * 5) {
        throw new BadRequestException('Kích thước quá lớn');
      }
    });
  }
  next();
});
