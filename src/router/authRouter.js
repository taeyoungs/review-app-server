import express from 'express';
import routes from '../routes';
import {
  joinLocal,
  pwHash,
  localAuth,
  localLogin,
  logout,
  exists,
  check,
  getUser,
  testLogin,
  tempPwChange,
  checkPassword,
} from '../api/auth/auth.controller';
import { localMiddleware } from '../middleware';
import { googleLogin } from '../controllers/userController';

const authRouter = express.Router();

// Join
authRouter.post(routes.join, joinLocal, localAuth, testLogin);

// Login
authRouter.post(routes.login, localAuth, localLogin);
// authRouter.post(routes.login, testAuth);

// Logout
authRouter.post(routes.logout, logout);

// Exists
authRouter.get(routes.exists, exists);

// Check
authRouter.get(routes.check, check);

authRouter.post(routes.tempPwChange, tempPwChange);

authRouter.post(routes.checkPassword, checkPassword);

authRouter.post(routes.googleLogin, googleLogin, testLogin);

export default authRouter;
