import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

const jwtSecret = process.env.JWT_SECRET;

export const generateToken = payload => {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, jwtSecret, { expiresIn: '7d' }, (error, token) => {
      if (error) reject(error);
      resolve(token);
    });
  });
};

const decodeToken = token => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, jwtSecret, (error, decoded) => {
      if (error) reject(error);
      resolve(decoded);
    });
  });
};

export const jwtMiddleware = async (req, res, next) => {
  const token = req.cookies.access_token;

  if (!token) return next();

  try {
    const decoded = await decodeToken(token);

    if (Date.now() / 1000 - decoded.iat > 60 * 60 * 24) {
      const { _id, profile } = decoded;
      const freshToken = await generateToken({ _id, profile }, 'user');
      res.cookie('access_token', freshToken, {
        httpOnly: true,
        maxAge: 100 * 60 * 60 * 24,
      });
    }

    req.user = decoded;
  } catch (error) {
    console.log(error);
    req.user = null;
  }

  next();
};
