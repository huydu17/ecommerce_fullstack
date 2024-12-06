import {
  IProductDocument,
  IProductPayload,
  IProductQueryParams
} from 'src/features/products/interfaces/product.interface';
import { Product } from 'src/features/products/models/product.schema';
import { BadRequestException } from 'src/shared/middlewares/globalErrorHandle';
import { cloudinaryService, UploadedFile } from './cloudinary.service';
import { IReviewDocuments } from 'src/features/reviews/interfaces/review.interface';
import { categoryService } from './category.service';
import { ICategoryDocument } from 'src/features/categories/interfaces/category.interface';

class ProductService {
  public async getAll(queryData: IProductQueryParams) {
    const { price, sort, attributes, categoryName, search } = queryData;
    let query = {};
    const queryObj = { ...queryData };
    const excludedFields = ['page', 'sort', 'limit', 'fields', 'attributes', 'search', 'categoryName'];
    excludedFields.forEach((el) => {
      delete queryObj[el as keyof IProductQueryParams];
    });
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    query = JSON.parse(queryStr);
    if (attributes) {
      const attrsQuery = attributes.split(',').reduce<Array<any>>((acc, item) => {
        if (item) {
          const [key, ...values] = decodeURIComponent(item).split('-');
          const matchQuery = {
            attributes: {
              $elemMatch: {
                key: key,
                value: { $in: values }
              }
            }
          };
          acc.push(matchQuery);
          return acc;
        } else return acc;
      }, []);

      if (attrsQuery.length > 0) {
        query = { ...query, $and: attrsQuery };
      }
    }
    if (categoryName) {
      const category: ICategoryDocument = await categoryService.getCategoryByName(`${categoryName}`);
      if (category) {
        query = { ...query, category: category._id };
      } else {
        throw new BadRequestException('Danh mục không tồn tại');
      }
    }
    let select = {};
    let sortBy = {};
    if (search) {
      query = { ...query, $text: { $search: search } };
      select = {
        score: { $meta: 'textScore' }
      };
      sortBy = { score: { $meta: 'textScore' } };
    }
    let productQuery = Product.find(query);
    if (sort) {
      sortBy = sort;
    } else {
      sortBy = '-createdAt';
    }
    productQuery = productQuery.sort(sortBy);
    //paging
    const page = queryData.page || 1;
    const limit = queryData.limit || 8;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const total = await Product.countDocuments(query);

    productQuery = productQuery.collation({ locale: 'en', strength: 2 }).select(select).skip(startIndex).limit(limit);
    const pagination: { next?: object; prev?: object } = {};
    if (endIndex < total) {
      pagination.next = {
        page: page + 1,
        limit
      };
    }
    if (startIndex > 0) {
      pagination.prev = {
        page: page - 1,
        limit
      };
    }
    const products = await productQuery;
    const totalPages = Math.ceil(total / limit);
    return { products, pagination, totalProducts: products.length, totalPages };
  }

  public async getById(productId: string) {
    const product = await this.getProductById(productId);
    if (!product) {
      throw new BadRequestException('Không tìm thấy sản phẩm');
    }
    return product;
  }
  public async adminGetAll() {
    const products: any = await Product.find({}).populate('category', 'name');
    return products;
  }
  public async create(data: IProductPayload, files: UploadedFile) {
    const { name, shortDescription, description, totalQty, category, price, attributes } = data;
    const attrs = JSON.parse(attributes);
    const productExisting = await Product.findOne({ name });
    if (productExisting) {
      throw new BadRequestException('Sản phẩm đã tồn tại');
    }
    const categoryExisting: ICategoryDocument = await categoryService.getCategoryByName(`${category}`);
    if (!categoryExisting) {
      throw new BadRequestException('Danh mục không tồn tại');
    }
    const listImages = files ? await cloudinaryService.upload(files, 'Product') : [];
    const product = new Product({
      name,
      shortDescription,
      description,
      totalQty,
      category: categoryExisting._id,
      price,
      attributes: attrs,
      images: listImages
    });
    await product.save();
    await categoryExisting.updateOne({
      $inc: { totalProducts: 1 }
    });
    return product;
  }
  // Pseudo code cho phía backend
  public async updateProduct(data: IProductPayload, files: UploadedFile, productId: string) {
    const { remainingImages, images, category, attributes, ...productData } = data;
    const parseRemainingImgs = JSON.parse(remainingImages);
    const parseAttributes = JSON.parse(attributes);
    const product = await this.getProductById(productId);
    if (!product) {
      throw new BadRequestException('Không tìm thấy sản phẩm');
    }
    const categoryExisting: ICategoryDocument = await categoryService.getCategoryByName(`${category}`);
    if (!categoryExisting) {
      throw new BadRequestException('Danh mục không tồn tại');
    }
    const imagesToDelete = product.images.filter((img: any) => !parseRemainingImgs.includes(img._id));
    await Promise.all(imagesToDelete.map((img: any) => cloudinaryService.delete(img.public_id)));
    const newListImages = files ? await cloudinaryService.upload(files, 'Product') : [];
    const updatedImages = [...parseRemainingImgs, ...newListImages];
    await Product.findByIdAndUpdate(
      productId,
      {
        ...productData,
        category: categoryExisting._id,
        attributes: parseAttributes,
        images: updatedImages
      },
      { new: true }
    );
  }

  public async delete(productId: string) {
    const productExisting = await Product.findById(productId);
    if (!productExisting) {
      throw new BadRequestException('Không tìm thấy sản phẩm');
    }
    const deleteMultiImage = productExisting.images.map((item, _) => {
      cloudinaryService.delete(item.public_Id);
    });
    await Promise.all(deleteMultiImage);
    await productExisting.deleteOne();
  }

  public async getProductById(productId: string) {
    return await Product.findById(productId).populate('reviews').populate('category');
  }
  public async updateProductReview(productId: string, reviewId: string) {
    const updatedProduct: any = await Product.findOneAndUpdate(
      { _id: productId },
      {
        $push: { reviews: reviewId },
        $inc: { totalReviews: 1 }
      },
      { new: true }
    ).populate('reviews');
    if (!updatedProduct) {
      throw new BadRequestException('Cập nhật lỗi');
    }
    const totalRating = updatedProduct.reviews.reduce((sum: any, review: IReviewDocuments) => {
      return sum + (review as unknown as IReviewDocuments).rating;
    }, 0);

    const newAverageRating = Number((totalRating / updatedProduct.totalReviews).toFixed(1));
    updatedProduct.averageRating = newAverageRating;
    await updatedProduct.save();
    return updatedProduct;
  }
  public async updateProductStock(ids: string[], qtys: number[]) {
    await Product.find({ _id: { $in: ids } }).then((products) => {
      products.forEach((product: any, idx) => {
        product.totalQty -= qtys[idx];
        product.totalSold += qtys[idx];
        product.save();
      });
    });
  }
  public async getAllProducts() {
    return await Product.find({});
  }
  public async productStats() {
    const stats = await Product.aggregate([
      {
        $group: {
          _id: null,
          totalRemain: {
            $sum: { $subtract: ['$totalQty', '$totalSold'] }
          }
        }
      }
    ]);
    return stats;
  }
  public async getBestSeller() {
    const bestSeller = await Product.aggregate([
      {
        $sort: { totalSold: -1 }
      },
      {
        $limit: 5
      }
    ]);
    return bestSeller;
  }
}
export const productService: ProductService = new ProductService();
