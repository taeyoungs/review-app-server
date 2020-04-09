import passport from 'passport';
import User from '../../models/User';
import nodemailer from 'nodemailer';
import { randomString } from '../../lib/func';

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
        about: `안녕하세요. ${username}입니다.`,
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
      id: req.user._id,
      profile: req.user.profile,
      likeReview: req.user.likeReview,
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
    id: req.user._id,
    profile: req.user.profile,
    likeReview: req.user.likeReview,
  });

  // if (req.user) {
  //   return res.status(200).json({
  //     user: {
  //       id: req.user._id,
  //       profile: req.user.profile,
  //     },
  //   });
  // } else {
  //   return res.status(401).json({
  //     msg: '사용자 정보가 일치하지 않습니다.',
  //   });
  // }
};

export const exists = async (req, res) => {
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
      id: user._id,
      profile: user.profile,
      likeReview: req.user.likeReview,
    });
  } else {
    console.log('/user undefined');

    return res.json({ uInfo: 'undefined' });
  }
};

export const tempPwChange = async (req, res) => {
  const {
    body: { email },
  } = req;

  const user = await User.findByEmail(email);

  if (!user) {
    return res.status(404).json({
      msg: 'Not Found User',
    });
  }

  const randomStr = randomString();

  try {
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'xoxodudwkd@gmail.com', // gmail 계정 아이디를 입력
        pass: 'xodud9411', // gmail 계정의 비밀번호를 입력
      },
    });

    let mailOptions = {
      from: 'xoxodudwkd@gmail.com', // 발송 메일 주소 (위에서 작성한 gmail 계정 아이디)
      to: email, // 수신 메일 주소
      subject: 'ReviewApp 임시 비밀번호입니다.', // 제목
      text: `임시 비밀번호 : ${randomStr} <br /> 임시 비밀번호로 로그인 하신 후 꼭 비밀번호를 재설정해주세요.`, // 내용
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
  } catch (error) {
    console.log(error);
  }

  try {
    await user.setPassword(randomStr);
    await user.save();

    return res.status(200).json({
      msg: 'Success to change password',
    });
  } catch (error) {
    console.log(error);
  }
};

export const checkPassword = async (req, res) => {
  const {
    body: { password },
  } = req;

  try {
    await req.user.authenticate(password, (err, doc) => {
      if (err) console.log(err);
      if (doc) {
        return res.status(200).json({
          msg: 'Success to authenticate',
        });
      } else {
        return res.status(400).json({
          msg: 'Fail to authenticate',
        });
      }
    });
  } catch (error) {
    console.log(error);
  }
};
