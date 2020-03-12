import crypto from 'crypto';
import passport from 'passport';
import User from '../../models/User';

export const joinLocal = async (req, res, next) => {
  console.log(req.body);
  const {
    body: { email, password, name },
  } = req;

  if (!req.body) {
    return res.status(400).json({
      success: false,
      error: 'You must provide a body to join',
    });
  }

  // Server 측에서 한번 더 아이디, 이름 중복 검사
  let existing = null;
  const payload = { username: name, email };
  try {
    existing = await User.findByEmailOrUsername(payload);
  } catch (e) {
    console.log(e);
  }

  if (existing) {
    // conflict
    return res.status(409).json({
      key: existing.email === email ? 'email' : 'username',
    });
  }

  try {
    const user = await User({
      email,
      profile: {
        username: name,
      },
    });
    const temp = await User.register(user, password);
  } catch (error) {
    return res.status(400).json({
      error,
    });
  }

  next();
};

export const localAuth = passport.authenticate('local');

export const localLogin = async (req, res) => {
  const userTemp = await User({
    id: req.user._id,
    profile: req.user.profile,
  });

  let token = null;
  try {
    token = await userTemp.generateToken();
    console.log(token);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error,
      message: 'Token generate error',
    });
  }

  res.cookie('access_token', token, {
    httpOnly: true,
    maxAge: 100 * 60 * 60 * 24,
  });

  console.log(req.user);
  if (req.user) {
    return res.status(200).json({
      user: {
        id: req.user._id,
        profile: req.user.profile,
      },
    });
  } else {
    return res.status(400);
  }
};

export const exists = async (req, res) => {
  //   console.log(req);
  const {
    params: { key, value },
  } = req;
  console.log(key, value);

  let user = null;
  try {
    user = await (key === 'email'
      ? User.findByEmail(value)
      : User.findByUsername(value));
    console.log(user);
  } catch (e) {
    return res.status(500).json({
      error: e,
    });
  }

  return res.status(200).json({
    exists: user !== null,
  });
};

export const logout = async (req, res) => {
  res.cookie('access_token', null, { maxAge: 0, httpOnly: true });
  req.logout();
  return res.status(200).json({
    success: true,
    message: 'Success to logout',
  });
};

export const check = async (req, res) => {
  const { user } = req;
  console.log('user: ', user);

  if (!user) {
    // Forbidden
    return res.status(403);
  }

  return res.status(200).json({
    id: user._id,
    profile: user.profile,
  });
};
