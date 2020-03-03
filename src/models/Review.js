import mongoose from 'mongoose';

const Review = new mongoose.Schema({
  movieId: {
    type: Number,
    required: 'Movie id is required',
  },
  condition: {
    type: Number,
    required: 'Condition is required',
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
});
