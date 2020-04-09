// edit profile, change password
import express from 'express';
import routes from '../routes';
import {
  changePassword,
  getUserDetail,
  editUserProfile,
} from '../controllers/userController';

const userRouter = express.Router();

userRouter.post(routes.changePassword, changePassword);

userRouter.get(routes.userDetail, getUserDetail);

userRouter.post(routes.editProfile, editUserProfile);

export default userRouter;
