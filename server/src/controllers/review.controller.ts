import { Request, Response } from 'express';
import HTTP_STATUS from 'http-status-codes';
import { reviewService } from 'src/services/db/review.service';
class ReviewController {
  public async writeReview(req: Request, res: Response): Promise<void> {
    await reviewService.create(req.body, req.params.productId, req.currentUser!);
    res.status(HTTP_STATUS.CREATED).json({
      message: 'Đánh giá thành công'
    });
  }
}
export const reviewController: ReviewController = new ReviewController();
