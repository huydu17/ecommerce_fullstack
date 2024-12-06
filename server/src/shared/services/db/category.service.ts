import {
  IAttributeData,
  ICategoryDocument,
  ICategoryPayload
} from 'src/features/categories/interfaces/category.interface';
import { Category } from 'src/features/categories/models/category.schema';
import { BadRequestException } from 'src/shared/middlewares/globalErrorHandle';
import { productService } from './product.service';
import { IProductDocument } from 'src/features/products/interfaces/product.interface';

class CategoryService {
  public async getAll() {
    const categories = await Category.find({}).sort({ name: 'asc' });
    return categories;
  }
  public async create(data: ICategoryPayload) {
    const { name, description, icon } = data;
    const categoryExisting = await Category.findOne({ name });
    if (categoryExisting) {
      throw new BadRequestException('Danh mục đã tồn tại');
    }
    return await Category.create({ name, description, icon });
  }
  public async saveAttribute(data: IAttributeData) {
    const { key, value, categoryChoosen } = data;
    const categoryExisting = await Category.findOne({ name: categoryChoosen });
    if (!categoryExisting) {
      throw new BadRequestException('Không tìm thấy danh mục');
    }
    const existingAttrIndex = categoryExisting.attributes.findIndex((attr) => attr.key === key);
    if (existingAttrIndex >= 0) {
      const values = new Set([...categoryExisting.attributes[existingAttrIndex].value, value]);
      categoryExisting.attributes[existingAttrIndex].value = Array.from(values);
    } else {
      categoryExisting.attributes.push({ key, value: [value] });
    }
    await categoryExisting.save();
    return categoryExisting;
  }
  public async getById(id: string) {
    const category = await Category.findById(id);
    if (!category) {
      throw new BadRequestException('Không tìm thấy danh mục');
    }
    return category;
  }
  public async update(id: string, data: ICategoryPayload) {
    const { name, description, icon } = data;
    const categoryExisting = await Category.findByIdAndUpdate(id, { name, description, icon }, { new: true });
    if (!categoryExisting) {
      throw new BadRequestException('Không tìm thấy danh mục');
    }
    return categoryExisting;
  }
  public async delete(id: string) {
    await Category.findByIdAndDelete(id);
    const products: any = await productService.getAllProducts();
    const updatePromises = products
      .filter((product: IProductDocument) => product.category?.toString() === id)
      .map((product: IProductDocument) => {
        product.category = undefined;
        return product.save();
      });
    await Promise.all(updatePromises);
  }
  public async getCategoryByName(name: string) {
    const category: ICategoryDocument = (await Category.findOne({ name })) as ICategoryDocument;
    return category;
  }
}
export const categoryService: CategoryService = new CategoryService();
