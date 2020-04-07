import mongoose from 'mongoose';

const CommentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  review: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Review',
  },
  content: String,
  createdAt: String,
});

const model = mongoose.model('Comment', CommentSchema);

export default model;
