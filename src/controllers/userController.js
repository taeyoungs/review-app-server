import passport from 'passport';
import User from '../models/User';
import Review from '../models/Review';
import Comment from '../models/Comment';
import { OAuth2Client } from 'google-auth-library';

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
    const user = await User.findById(id);
    const recent = await Review.find({ user: id })
      .sort({ createdAt: 'desc' })
      .limit(3);
    const best = await Review.find({ user: id })
      .sort({ views: 'desc' })
      .limit(3);

    // const query = User.where({ email: result.email });
    // await query.findOne(async (err, user) => {
    if (user) {
      return res.status(200).json({
        user,
        recent,
        best,
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
    body: { id, username, newP, about },
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
      await User.setPassword(newP, (err, doc) => {
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

  console.log(file);

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

export const googleLogin = async (req, res, next) => {
  const {
    body: { tokenId },
  } = req;

  const client_id =
    '1060200703755-6mdo0b79pdmguq22l2st0ad91csqjbis.apps.googleusercontent.com';

  const client = new OAuth2Client(client_id);

  let result = {};

  try {
    const ticket = await client.verifyIdToken({
      idToken: tokenId,
      audience: client_id,
    });
    result = ticket.getPayload();
    // console.log(result);
  } catch (error) {
    console.log(error);
  }

  if (result.aud !== client_id) return res.status(400);

  try {
    const query = User.where({ email: result.email });
    await query.findOne(async (err, user) => {
      if (err) console.log(err);
      if (user) {
        // console.log(user);
        user.social.google.id = result.sub;
        user.save();
        req.user = user;
      } else {
        const newUser = await User.create({
          profile: {
            username: result.name,
            about: `안녕하세요. ${result.name}입니다.`,
            thumbnail: result.picture,
          },
          email: result.email,
          social: {
            google: {
              id: result.sub,
            },
          },
        });
        req.user = newUser;
      }
    });

    req.session.passport.user = result.email;
    req.session.save();
  } catch (error) {
    console.log(error);
  }
  next();
};

export const dropOutUser = async (req, res) => {
  const {
    params: { id },
  } = req;

  console.log(`id: ${id}`);

  try {
    // 로그아웃
    req.logout();

    // User Review 삭제
    await Review.deleteMany({ user: id });

    // User Comment 삭제
    await Comment.deleteMany({ user: id });

    // User 삭제
    await User.findByIdAndDelete(id);

    return res.status(200).json({
      msg: 'Success to dropout',
    });
  } catch (error) {
    console.log(error);
  }
};
