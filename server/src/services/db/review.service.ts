import { UserPayload } from 'src/type';
import { productService } from './product.service';
import mongoose, { Types } from 'mongoose';
import { Review } from 'src/models/review.schema';
import { IReviewPayload } from 'src/interfaces/review.interface';
import { BadRequestException } from 'src/middlewares/globalErrorHandle';

class ReviewService {
  public async create(data: IReviewPayload, productId: string, currentUser: UserPayload) {
    const { content, rating } = data;
    if (!Types.ObjectId.isValid(productId)) {
      throw new BadRequestException('Id sản phẩm không đúng');
    }
    const session = await Review.startSession();
    const reviewId = new Types.ObjectId();
    session.startTransaction();
    await Review.create(
      [
        {
          _id: reviewId,
          content,
          productId,
          rating,
          user: {
            _id: currentUser.userId,
            name: currentUser.firstName + ' ' + currentUser.lastName
          }
        }
      ],
      { session: session }
    );
    const product = await productService.getProductById(productId);
    product?.$session(session);
    if (!product) {
      session.abortTransaction();
      session.endSession();
      throw new BadRequestException('Không tìm thấy sản phẩm');
    }

    const checkAlreadyReview = product.reviews.findIndex(
      (review: any) => review?.user._id.toString() === currentUser.userId.toString()
    );
    if (checkAlreadyReview >= 0) {
      await session.abortTransaction();
      session.endSession();
      throw new BadRequestException('Bạn đã đánh giá sản phẩm này rồi');
    }
    const updateProductReview = await productService.updateProductReview(productId, `${reviewId}`);
    await session.commitTransaction();
    session.endSession();
    return updateProductReview;
  }
}

export const reviewService: ReviewService = new ReviewService();
