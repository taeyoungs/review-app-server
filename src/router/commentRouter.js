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

commentRouter.put(routes.updateComment, updateComment);

commentRouter.delete(routes.deleteComment, deleteComment);

commentRouter.get(routes.reviewComments, getReviewComments);

export default commentRouter;
