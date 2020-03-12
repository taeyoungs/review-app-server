import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';
import passport from 'passport';
import session from 'express-session';
import dotenv from 'dotenv';

dotenv.config();

import routes from './routes';
import './passport';
import apiRouter from './router/apiRouter';

const app = express();

app.use(helmet());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: true,
    saveUninitialized: false,
  }),
);

app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
  res.send(`Hello World! ${routes.auth} ${routes.exist} ${routes.exists}`);
});

// app.use('/api/auth/exists/:key(email|username)/:value', test);
app.use(routes.api, apiRouter);

export default app;
