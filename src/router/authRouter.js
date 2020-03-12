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
} from '../api/auth/auth.controller';

const authRouter = express.Router();

// Join
authRouter.post(routes.join, joinLocal, localAuth, localLogin);

// Login
authRouter.post(routes.login, localAuth, localLogin);

// Logout
authRouter.post(routes.logout, logout);

// Exists
authRouter.get(routes.exists, exists);

// Check
authRouter.get(routes.check, check);

export default authRouter;
