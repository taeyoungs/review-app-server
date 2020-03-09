import passport from 'passport';
import User from '../models/User';

export const join = async (req, res) => {
  const {
    body: { email, password, name },
  } = req;

  const payload = {
    email,
    password,
    name,
  };

  if (!body) {
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
    await User.register(email, password);
  } catch (error) {
    console.log(error);
  }
};

export const login = (req, res) => {};
