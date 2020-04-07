import express from 'express';
import routes from '../routes';
import {
  createComment,
  updateComment,
  getReviewComments,
  deleteComment,
} from '../controllers/commentController';

const commentRouter = express.Router();

// create, update, delete, getComments
commentRouter.post(routes.createComment, createComment);

commentRouter.post(routes.updateComment, updateComment);

commentRouter.get(routes.reviewComments, getReviewComments);

commentRouter.post(routes.deleteComment, deleteComment);

export default commentRouter;
