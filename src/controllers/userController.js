import passport from 'passport';
import User from '../models/User';

export const join = async (req, res) => {
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

  try {
    const user = await User({
      email,
      name,
    });
    await User.register(user, password);
    return res.status(201).json({
      success: true,
      message: 'Success to sign up',
      user,
    });
  } catch (error) {
    return res.status(400).json({
      error,
      message: "Can't register user",
    });
  }
};

export const auth = passport.authenticate('local');

export const login = (req, res) => {
  console.log(req.user);
  if (req.user) {
    return res.status(201).json({
      success: true,
      user: req.user,
      message: 'Success to login',
    });
  } else {
    return res.status(400).json({
      success: false,
      error: 'Fail to login, Check email or password',
    });
  }
};

// export const logout = (req, res) => {
//   req.logout();
//   return res.status(201).json({
//     success: true,
//     message: 'Success to logout',
//   });
// };
