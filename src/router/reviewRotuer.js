import express from 'express';
import routes from '../routes';
import {
  insertReview,
  getReview,
  getReviewList,
  deleteReview,
} from '../controllers/reviewController';

const reviewRouter = express.Router();

// insert, delete, update

// insert
reviewRouter.post(routes.upload, insertReview);

reviewRouter.get(routes.list, getReviewList);

reviewRouter.get(routes.reviewDetail, getReview);

reviewRouter.get(routes.deleteReview, deleteReview);

export default reviewRouter;
