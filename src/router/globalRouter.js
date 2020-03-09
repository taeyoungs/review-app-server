// login (local, social), logout, sign up
import express from 'express';
import routes from '../routes';
import { join } from '../controllers/userController';

const globalRouter = express.Router();

// Join
globalRouter.post(routes.join, join);

// Login
// globalRouter.post(routes.login);

// Logout
// globalRouter.post(routes.logout);

export default globalRouter;
