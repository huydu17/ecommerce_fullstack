import HTTP_STATUS from 'http-status-codes';
import { Request, Response } from 'express';
import { categoryService } from 'src/services/db/category.service';
import { IAttributeData, ICategoryPayload } from 'src/interfaces/category.interface';
class CategoryController {
  public async getCategories(req: Request, res: Response): Promise<void> {
    const categories = await categoryService.getAll();
    res.status(HTTP_STATUS.OK).json({
      message: 'Lấy tất cả danh mục thành công',
      data: categories
    });
  }
  public async createCategory(req: Request, res: Response): Promise<void> {
    await categoryService.create(req.body as ICategoryPayload);
    res.status(HTTP_STATUS.CREATED).json({
      message: 'Tạo danh mục thành công'
    });
  }
  public async getCategoryById(req: Request, res: Response): Promise<void> {
    const category = await categoryService.getById(req.params.id);
    res.status(HTTP_STATUS.OK).json({
      message: 'Lấy danh mục thành công',
      data: category
    });
  }
  public async updateCategory(req: Request, res: Response): Promise<void> {
    await categoryService.update(req.params.id, req.body as ICategoryPayload);
    res.status(HTTP_STATUS.OK).json({
      message: 'Cập nhật danh mục thành công'
    });
  }
  public async deleteCategory(req: Request, res: Response): Promise<void> {
    await categoryService.delete(req.params.id);
    res.status(HTTP_STATUS.OK).json({
      message: 'Xóa danh mục thành công'
    });
  }
  public async saveAttributes(req: Request, res: Response): Promise<void> {
    const category = await categoryService.saveAttribute(req.body as IAttributeData);
    res.status(HTTP_STATUS.OK).json({
      message: 'Lưu thuộc tính thành công',
      data: category
    });
  }
}
export const categoryController: CategoryController = new CategoryController();
