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
} from '../api/auth/auth.controller';
import { localMiddleware } from '../middleware';

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

export default authRouter;
