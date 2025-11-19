import { Request, Response } from 'express';
import { UploadedFile } from 'express-fileupload';
import { IProductPayload } from 'src/interfaces/product.interface';
import { productService } from 'src/services/db/product.service';

class ProductController {
  public async getAll(req: Request, res: Response): Promise<void> {
    const { categoryName } = req.params;
    const query = { ...req.query, page: Number(req.query.page), limit: Number(req.query.limit), categoryName };
    const { products, pagination, totalProducts, totalPages } = await productService.getAll(query);
    res.status(200).json({
      message: 'Lấy sản phẩm thành công',
      pagination,
      totalProducts,
      totalPages,
      data: products
    });
  }
  public async get(req: Request, res: Response): Promise<void> {
    const product = await productService.getById(req.params.id);
    res.status(200).json({
      message: 'Lấy sản phẩm thành công',
      data: product
    });
  }
  public async adminGetAll(req: Request, res: Response): Promise<void> {
    const products = await productService.adminGetAll();
    res.status(200).json({
      message: 'Lấy sản phẩm thành công',
      data: products
    });
  }
  public async create(req: Request, res: Response): Promise<void> {
    const fileList: UploadedFile = req.files?.images as UploadedFile;
    const product = await productService.create(req.body as IProductPayload, fileList);
    res.status(200).json({
      message: 'Thêm sản phẩm thành công',
      data: product._id
    });
  }

  public async update(req: Request, res: Response): Promise<void> {
    const fileList: UploadedFile = req.files?.images as UploadedFile;
    await productService.updateProduct(req.body as IProductPayload, fileList, req.params.id);
    res.status(200).json({
      message: 'Cập nhật thành công'
    });
  }

  public async delete(req: Request, res: Response): Promise<void> {
    await productService.delete(req.params.id);
    res.status(200).json({
      message: 'Xoá thành công'
    });
  }
  public async getBestSeller(req: Request, res: Response): Promise<void> {
    const products = await productService.getBestSeller();
    res.status(200).json({
      message: 'Lấy sản phẩm bán chạy thành công',
      data: products
    });
  }
}

export const productController: ProductController = new ProductController();
