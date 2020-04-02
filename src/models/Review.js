import mongoose from 'mongoose';

const ReviewSchema = new mongoose.Schema({
  movie: {
    movieId: {
      type: Number,
      required: 'Movie id is required',
    },
    poster: {
      type: String,
    },
    genres: {
      type: Array,
    },
    movieTitle: {
      type: String,
    },
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
  formatCreatedAt: String,
});

const model = mongoose.model('Review', ReviewSchema);

export default model;
