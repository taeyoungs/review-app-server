import passport from 'passport';
import User from './models/User';
import NaverStrategy from 'passport-naver';
import routes from './routes';

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
