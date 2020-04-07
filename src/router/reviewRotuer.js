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

export default reviewRouter;
