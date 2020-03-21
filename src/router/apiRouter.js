import express from 'express';
import authRouter from './authRouter';
import routes from '../routes';
import { jwtMiddleware } from '../lib/token';

const apiRouter = express.Router();

apiRouter.use(routes.auth, authRouter);

export default apiRouter;
