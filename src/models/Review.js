import mongoose from 'mongoose';

const ReviewSchema = new mongoose.Schema({
  movieId: {
    type: Number,
    required: 'Movie id is required',
  },
  emotion: {
    type: Number,
    required: 'Emotion is required',
  },
  star: {
    type: Number,
    required: 'Rating is required',
  },
  title: {
    type: String,
    required: 'Title is required',
  },
  views: {
    type: Number,
    default: 0,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  content: {
    type: String,
    required: 'Content is required',
  },
  spoiled: Boolean,
  comment: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment',
    },
  ],
  createdAt: { type: Date, default: Date.now },
});

const model = mongoose.model('Review', ReviewSchema);

export default model;
