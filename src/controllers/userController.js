import passport from 'passport';
import User from '../models/User';

export const changePassword = async (req, res) => {
  const {
    body: { oldPassword, newPassword, newPassword2 },
  } = req;

  if (newPassword !== newPassword2) {
    return res.status(400);
  }

  try {
    await req.user.changePassword(oldPassword, newPassword);
    return res.status(200).json({
      msg: 'Success to change password',
    });
  } catch (error) {
    console.log(error);
  }
};

export const getUserDetail = async (req, res) => {
  const {
    params: { id },
  } = req;
};
