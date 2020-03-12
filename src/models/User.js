import mongoose from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose';
import crypto from 'crypto';
import { generateToken } from '../lib/token';

const hash = password =>
  crypto
    .createHmac('sha256', process.env.SECRET_KEY)
    .update(password)
    .digest('hex');

const UserSchema = new mongoose.Schema({
  profile: {
    username: String,
    thumnail: { type: String, default: 'images/default_thumnail.png' },
  },
  email: {
    type: String,
    required: 'Email is required',
  },
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
  reviewScore: {
    type: Number,
    default: 0,
  },
  createdAt: { type: Date, default: Date.now },
});

UserSchema.statics.findByUsername = function(username) {
  return this.findOne({ 'profile.usename': username }).exec();
};

UserSchema.statics.findByEmail = function(email) {
  return this.findOne({ email }).exec();
};

UserSchema.statics.findByEmailOrUsername = function({ username, email }) {
  return this.findOne({
    $or: [{ 'profile.username': username }, { email }],
  }).exec();
};

// UserSchema.statics.localRegister = ({ username, email, password }) => {
//   const user = new this({
//     profile: {
//       username,
//     },
//     email,
//     password: hash(passowrd),
//   });

//   return user.save();
// };

UserSchema.methods.validatePassword = password => {
  const hashed = hash(password);

  return this.password === hashed;
};

UserSchema.methods.generateToken = function() {
  // jwt에 담을 내용
  const payload = {
    _id: this._id,
    profile: this.profile,
  };

  return generateToken(payload, 'User');
};

UserSchema.plugin(passportLocalMongoose, { usernameField: 'email' });

const model = mongoose.model('User', UserSchema);

export default model;
