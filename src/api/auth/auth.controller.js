import passport from 'passport';
import User from '../../models/User';

export const joinLocal = async (req, res, next) => {
  const {
    body: { email, password, username },
  } = req;

  if (!req.body) {
    return res.status(400).json({
      success: false,
      error: 'You must provide a body to join',
    });
  }

  // Server 측에서 한번 더 아이디, 이름 중복 검사
  let existing = null;
  try {
    existing = await User.findByEmailOrUsername(username, email);
  } catch (e) {
    console.log(e);
  }

  if (existing) {
    // conflict
    return res.status(409).json({
      key: existing.email === email ? 'email' : 'username',
    });
  }

  let user = null;
  try {
    user = await User({
      profile: {
        username,
      },
      email,
    });
    await User.register(user, password);
    next();
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      msg: 'register error',
    });
  }

  // let token = null;
  // try {
  //   token = await user.generateToken();
  //   console.log(token);
  // } catch (error) {
  //   console.log(error);
  //   return res.status(500).json({
  //     error,
  //     message: 'Token generate error',
  //   });
  // }

  // res.cookie('access_token', token, {
  //   httpOnly: true,
  //   maxAge: 100 * 60 * 60 * 24,
  // });

  // return res.status(200).json({
  //   profile: user.profile,
  // });
};

export const localAuth = passport.authenticate('local');

export const testLogin = (req, res) => {
  if (req.user) {
    console.log(req.user);
    console.log(req.session);
    return res.status(200).json({
      profile: req.user.profile,
    });
  } else {
    return res.status(404);
  }
};

export const localLogin = async (req, res) => {
  console.log(req.user);

  const {
    body: { email, password },
  } = req;

  // let user = null;
  // try {
  //   user = await User.findByEmail(email);
  // } catch (error) {
  //   console.log(error);
  // }

  // if (!user || !user.validatePassword(password)) {
  //   return res.status(400).json({
  //     msg: '가입한 적이 없거나 비밀번호가 일치하지 않습니다.',
  //   });
  // }

  // let token = null;
  // try {
  //   token = await user.generateToken();
  //   console.log(token);
  // } catch (error) {
  //   console.log(error);
  //   return res.status(500).json({
  //     error,
  //     message: 'Token generate error',
  //   });
  // }

  // res.cookie('access_token', token, {
  //   httpOnly: true,
  //   maxAge: 100 * 60 * 60 * 24,
  // });

  console.log(req.session);

  return res.status(200).json({
    profile: req.user.profile,
  });

  // req.session.save(() => {
  //   if (req.user) {
  //     return res.status(200).json({
  //       user: {
  //         id: req.user._id,
  //         profile: req.user.profile,
  //       },
  //     });
  //   } else {
  //     return res.status(400).json({
  //       error: 'userInfo doesnt exists',
  //     });
  //   }
  // });
};

export const exists = async (req, res) => {
  //   console.log(req);
  const {
    params: { key, value },
  } = req;
  console.log(key, value);
  // console.log('user: ', req.user);

  // const test = await User.findOne({ 'profile.username': value });
  // console.log(test);

  let user = null;
  try {
    user = await (key === 'email'
      ? User.findByEmail(value)
      : User.findByUsername(value));
    console.log(user);
  } catch (e) {
    console.log(e);
    return res.status(500);
  }

  return res.status(200).json({
    exists: user !== null,
  });
};

export const logout = async (req, res) => {
  // res.cookie('access_token', null, { maxAge: 0, httpOnly: true });
  req.logout();
  return res.status(200).json({
    success: true,
    message: 'Success to logout',
  });
};

export const check = async (req, res) => {
  // console.log(req.isAuthenticated());
  console.log(req.user);
  const { user } = req;

  if (req.session.passport) {
    console.log('/user ' + JSON.stringify(req.session.passport.user));

    return res.status(200).json({
      profile: user.profile,
    });
  } else {
    console.log('/user undefined');

    return res.json({ uInfo: 'undefined' });
  }

  // if (!user) {
  //   // Forbidden
  //   return res.status(403).json({
  //     error: 'user forbidden',
  //   });
  // }

  // return res.status(200).json({
  //   profile: user.profile,
  // });
};