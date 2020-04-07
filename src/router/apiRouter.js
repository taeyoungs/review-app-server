import express from 'express';
import routes from '../routes';
import authRouter from './authRouter';
import userRouter from './userRouter';
import reviewRouter from './reviewRotuer';
import commentRouter from './commentRouter';

const apiRouter = express.Router();

apiRouter.use(routes.auth, authRouter);

apiRouter.use(routes.users, userRouter);

apiRouter.use(routes.reviews, reviewRouter);

apiRouter.use(routes.comments, commentRouter);

export default apiRouter;
