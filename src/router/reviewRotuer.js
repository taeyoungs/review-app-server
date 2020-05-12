import express from 'express';
import routes from '../routes';
import {
  insertReview,
  getReview,
  getReviewList,
  deleteReview,
  getMovieReviewList,
  editReview,
  likeReview,
  dislikeReview,
  getReviewPaging,
} from '../controllers/reviewController';

const reviewRouter = express.Router();

// insert, delete, update
reviewRouter.post(routes.upload, insertReview);

reviewRouter.get(routes.reviewPaging, getReviewPaging);

reviewRouter.get(routes.list, getReviewList);

reviewRouter.get(routes.reviewDetail, getReview);

reviewRouter.delete(routes.deleteReview, deleteReview);

reviewRouter.get(routes.movieReviewList, getMovieReviewList);

reviewRouter.put(routes.editReview, editReview);

reviewRouter.put(routes.likeReview, likeReview);

reviewRouter.put(routes.dislikeReview, dislikeReview);

export default reviewRouter;
