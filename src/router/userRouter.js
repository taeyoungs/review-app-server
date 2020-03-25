// edit profile, change password
import express from 'express';
import routes from '../routes';
import { changePassword, getUserDetail } from '../controllers/userController';

const userRouter = express.Router();

userRouter.post(routes.changePassword, changePassword);

userRouter.get(routes.userDetail, getUserDetail);

export default userRouter;
