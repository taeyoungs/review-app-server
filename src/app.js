import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import path from 'path';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';
import passport from 'passport';
import session from 'express-session';
import mongoose from 'mongoose';
import MongoStore from 'connect-mongo';

import routes from './routes';
import './passport';
import apiRouter from './router/apiRouter';
import authRouter from './router/authRouter';

const app = express();

// const cookieExpirationDate = new Date();
// const cookieExpirationDays = 365;
// cookieExpirationDate.setDate(
//   cookieExpirationDate.getDate() + cookieExpirationDays,
// );

const CookieStore = MongoStore(session);

app.use(helmet());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  cors({
    credentials: true,
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  }),
);
// app.use(function(req, res, next) {
//   res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); // your website
//   res.header('Access-Control-Allow-Credentials', 'true');
//   res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
//   res.header(
//     'Access-Control-Allow-Headers',
//     'Content-Type, Authorization, Content-Length, X-Requested-With',
//   );
//   if ('OPTIONS' === req.method) {
//     res.sendStatus(200);
//   } else {
//     next();
//   }
// });
app.use(morgan('dev'));
app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: true,
    saveUninitialized: false,
    store: new CookieStore({ mongooseConnection: mongoose.connection }),
  }),
);
app.use(passport.initialize());
app.use(passport.session());

app.use(routes.home, apiRouter);

export default app;
