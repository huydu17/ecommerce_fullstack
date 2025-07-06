import connectDb from '../config/connectDb';
import { userData } from './user';
import { reviewsData } from './review';
import { productsData } from './product';
import { categoriesData } from './category';
import { Category } from 'src/models/category.schema';
import { Product } from 'src/models/product.schema';
import { User } from 'src/models/user.schema';
import { Review } from 'src/models/review.schema';
import { Order } from 'src/models/order.schema';
import { Token } from 'src/models/token.schema';
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
