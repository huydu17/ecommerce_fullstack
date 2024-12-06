import { User } from 'src/features/users/models/user.schema';
import connectDb from '../config/connectDb';
import { userData } from './user';
import { Category } from 'src/features/categories/models/category.schema';
import { Product } from 'src/features/products/models/product.schema';
import { Review } from 'src/features/reviews/models/review.schema';
import { reviewsData } from './review';
import { productsData } from './product';
import { categoriesData } from './category';
import { Order } from 'src/features/orders/models/order.schema';
import { Token } from 'src/features/auth/models/token.schema';
connectDb();
const importData = async () => {
  try {
    await Category.collection.dropIndexes();
    await Product.collection.dropIndexes();

    await User.collection.deleteMany({});
    await Category.collection.deleteMany({});
    await Product.collection.deleteMany({});
    await Review.collection.deleteMany({});
    await User.collection.deleteMany({});
    await Review.collection.deleteMany({});
    await Order.collection.deleteMany({});
    await Token.collection.deleteMany({});
    if (process.argv[2] !== '-d') {
      await User.insertMany(userData);
      await Category.insertMany(categoriesData);
      const reviews = await Review.insertMany(reviewsData);
      productsData.forEach((product: any) => {
        reviews.forEach((review) => {
          if (product._id.toString() === review.productId.toString()) {
            product.reviews.push(review._id);
          }
        });
      });
      await Product.insertMany(productsData);
      console.log('Tạo dữ liệu thành công');
      process.exit();
    }
    console.log('Xoá dữ liệu thành công');
    process.exit();
  } catch (err) {
    console.error('Lỗi', err);
    process.exit(1);
  }
};
importData();
