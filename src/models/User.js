import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: 'Email is required',
  },
  avatarUrl: String,
  likeReview: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Review',
    },
  ],
  naverId: Number,
  googleId: Number,
});

const model = mongoose.model('User', UserSchema);

export default model;
