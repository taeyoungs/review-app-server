import mongoose from 'mongoose';
import crypto from 'crypto';
import passportLocalMongoose from 'passport-local-mongoose';
import { generateToken } from '../lib/token';

const hash = password => {
  console.log(password);
  return crypto
    .createHmac('sha256', process.env.SECRET_KEY)
    .update(password)
    .digest('hex');
};

const User = new mongoose.Schema({
  profile: {
    username: String,
    thumnail: { type: String, default: 'default' },
  },
  email: {
    type: String,
    required: 'Email is required',
  },
  password: String,
  social: {
    naver: {
      id: String,
      accessToken: String,
    },
    google: {
      id: String,
      accessToken: String,
    },
  },
  likeReview: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Review',
    },
  ],
  reviewList: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Review',
    },
  ],
  reviewScore: {
    type: Number,
    default: 0,
  },
  createdAt: { type: Date, default: Date.now },
});

User.statics.findByUsername = function(username) {
  return this.findOne({ 'profile.username': username }).exec();
};

User.statics.findByEmail = function(email) {
  return this.findOne({ email }).exec();
};

User.statics.findByEmailOrUsername = function({ username, email }) {
  return this.findOne({
    $or: [{ 'profile.username': username }, { email }],
  }).exec();
};

// User.statics.localRegister = ({ username, email, password }) => {
//   console.log(hash(password));
//   const user = new this({
//     profile: {
//       username,
//     },
//     email,
//     password: hash(password),
//   });

//   return user.save();
// };

// User.methods.validatePassword = password => {
//   const hashed = hash(password);

//   return this.password === hashed;
// };

// User.methods.generateToken = function() {
//   // jwt에 담을 내용
//   const payload = {
//     _id: this._id,
//     profile: this.profile,
//   };

//   return generateToken(payload, 'user');
// };

User.plugin(passportLocalMongoose, { usernameField: 'email' });

const model = mongoose.model('User', User);

export default model;
