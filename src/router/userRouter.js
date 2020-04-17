// edit profile, change password
import express from 'express';
import routes from '../routes';
import {
  changePassword,
  getUserDetail,
  editUserProfile,
  editUserThumbnail,
  dropOutUser,
} from '../controllers/userController';
import { uploadUserThumbnail, deleteThumbnail } from '../middleware';

const userRouter = express.Router();

userRouter.post(routes.changePassword, changePassword);

userRouter.get(routes.userDetail, getUserDetail);

userRouter.post(routes.editProfile, editUserProfile);

userRouter.post(
  routes.uploadThumbnail,
  deleteThumbnail,
  uploadUserThumbnail,
  editUserThumbnail,
);

userRouter.get(routes.dropOutUser, dropOutUser);

// userRouter.post(routes.uploadThumbnail, testThumbnail);

export default userRouter;
