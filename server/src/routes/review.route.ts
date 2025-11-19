import { Router } from 'express';
import { validateSchema } from 'src/middlewares/joi-validate.middleware';
import { authMiddleware } from 'src/middlewares/auth.middleware';
import { asyncWrapper } from 'src/middlewares/globalErrorHandle';
import { reviewController } from '../controllers/review.controller';
import { createReviewScheme } from 'src/schemas/review';

class ReviewtRoute {
  private router: Router;
  constructor() {
    this.router = Router();
  }
  public routes(): Router {
    this.router.post(
      '/write-review/:productId',
      authMiddleware.isLogin,
      validateSchema(createReviewScheme),
      asyncWrapper(reviewController.writeReview)
    );
    return this.router;
  }
}

export const reviewRoute: ReviewtRoute = new ReviewtRoute();
