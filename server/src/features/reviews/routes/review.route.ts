import { Router } from 'express';
import { validateSchema } from 'src/shared/middlewares/joi-validate.middleware';
import { authMiddlware } from 'src/shared/middlewares/auth.middleware';
import { asyncWrapper } from 'src/shared/middlewares/globalErrorHandle';
import { createReviewScheme } from '../schemes/review';
import { reviewController } from '../controllers/review.controller';

class ReviewtRoutes {
  private router: Router;
  constructor() {
    this.router = Router();
  }
  public routes(): Router {
    this.router.post(
      '/write-review/:productId',
      authMiddlware.isLogin,
      validateSchema(createReviewScheme),
      asyncWrapper(reviewController.writeReview)
    );
    return this.router;
  }
}

export const reviewRoutes: ReviewtRoutes = new ReviewtRoutes();
