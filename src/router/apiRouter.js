import express from 'express';
import routes from '../routes';
import authRouter from './authRouter';
import userRouter from './userRouter';

const apiRouter = express.Router();

apiRouter.use(routes.auth, authRouter);

apiRouter.use(routes.users, userRouter);

export default apiRouter;
