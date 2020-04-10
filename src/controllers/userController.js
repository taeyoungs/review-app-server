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

  try {
    const user = await User.findById(id).populate('reviewList');
    if (user) {
      return res.status(200).json({
        user,
      });
    } else {
      return res.status(404).json({
        msg: '유저 없음',
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const editUserProfile = async (req, res) => {
  const {
    body: { id, username, newP, password, about },
  } = req;

  // console.log(req.body);

  try {
    await User.findById(id, (err, doc) => {
      if (err) console.log(err);
      doc.profile.username = username;
      doc.profile.about = about;
      doc.save();
    });
    if (newP !== '') {
      await User.changePassword(password, newP, (err, doc) => {
        if (err) console.log(err);
      });
    }
    return res.status(200).json({ msg: 'Success to change pw' });
  } catch (error) {
    console.log(error);
  }
};

export const editUserThumbnail = async (req, res) => {
  const {
    body: { id },
    file,
  } = req;

  // s3에 먼저 이미지가 정상적으로 올라가는지부터 확인
  try {
    await User.findById(id, (err, doc) => {
      if (err) console.log(err);
      doc.profile.thumbnail = file ? file.location : req.user.profile.thumbnail;
      doc.profile.thumbnailKey = file.key;
      doc.save();
    });
    return res.status(200).json({
      location: file.location,
    });
  } catch (error) {
    console.log(error);
  }
};

export const testThumbnail = (req, res) => {
  console.log(req.body);
};
