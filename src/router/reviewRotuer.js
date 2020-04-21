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

reviewRouter.get(routes.list, getReviewList);

reviewRouter.get(routes.reviewDetail, getReview);

reviewRouter.get(routes.deleteReview, deleteReview);

reviewRouter.get(routes.movieReviewList, getMovieReviewList);

reviewRouter.post(routes.editReview, editReview);

reviewRouter.post(routes.likeReview, likeReview);

reviewRouter.post(routes.dislikeReview, dislikeReview);

reviewRouter.post(routes.reviewPaging, getReviewPaging);

export default reviewRouter;
