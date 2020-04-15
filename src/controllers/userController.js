import passport from 'passport';
import User from '../models/User';
import Axios from 'axios';
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

export const googleLogin = async (req, res, next) => {
  const {
    body: { tokenId },
  } = req;

  // tokenId
  // console.log(tokenId);

  const client_id =
    '1060200703755-6mdo0b79pdmguq22l2st0ad91csqjbis.apps.googleusercontent.com';

  const client = new OAuth2Client(client_id);

  let result = {};

  try {
    const ticket = await client.verifyIdToken({
      idToken: tokenId,
      audience: client_id, // Specify the CLIENT_ID of the app that accesses the backend
      // Or, if multiple clients access the backend:
      //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
    });
    result = ticket.getPayload();
    console.log(result);
  } catch (error) {
    console.log(error);
  }

  // const result = await verify(tokenId).catch(console.error);

  // console.log(result['sub']);

  // const result = await Axios.get(
  //   'https://www.googleapis.com/oauth2/v3/tokeninfo',
  //   {
  //     params: {
  //       id_token: tokenId,
  //     },
  //   },
  // );
  // console.log(result.data);

  if (result.aud !== client_id) return res.status(400);

  try {
    console.log('!!!!!!!!!!!!!!!!!!!!');
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
