import Review from '../models/Review';
import dateFormat from '../lib/dateFormat';

export const insertReview = async (req, res) => {
  console.log(req.body);

  const {
    body: { emotion, title, content, star, movie, spoiled },
  } = req;

  try {
    const newReview = await Review.create({
      movie,
      title,
      emotion,
      star,
      content,
      spoiled,
      user: req.user.id,
    });

    await Review.findByIdAndUpdate(newReview._id, {
      formatCreatedAt: dateFormat(newReview.createdAt),
    });
    // const formatCreatedAt = dateFormat(newReview.createdAt);
    // newReview.createdAt = formatCreatedAt;
    // newReview.save();
    req.user.reviewList.push(newReview.id);
    req.user.save();
    return res.status(200).json({
      reviewId: newReview.id,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getReviewList = async (req, res) => {
  try {
    const reviews = await Review.find({})
      .populate('user')
      .sort({ createdAt: 'desc' });

    console.log(reviews);
    return res.status(200).json({
      reviews,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getReview = async (req, res) => {
  const {
    params: { id },
  } = req;

  try {
    const review = await Review.findById(id).populate('user');
    console.log(review);

    return res.status(200).json({
      review,
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteReview = async (req, res) => {
  const {
    params: { id },
  } = req;

  try {
    const index = req.user.reviewList.indexOf(id);
    req.user.reviewList.splice(index, 1);
    req.user.save();
    await Review.findByIdAndRemove({ _id: id });

    return res.status(200).json({
      msg: 'Delete Success',
    });
  } catch (error) {
    console.log(error);
  }
};

export const getMovieReviewList = async (req, res) => {
  const {
    params: { id },
  } = req;

  try {
    const reviews = await Review.find({}).populate('user');

    const movieReviews = reviews.filter(
      review => String(review.movie.movieId) === id,
    );

    return res.status(200).json({
      movieReviews,
    });
  } catch (error) {
    console.log(error);
  }
};

export const editReview = async (req, res) => {
  const {
    body: { id, emotion, title, content, star, spoiled },
  } = req;

  console.log(id);
  try {
    await Review.findByIdAndUpdate(id, {
      emotion,
      title,
      content,
      star,
      spoiled,
      createdAt: Date.now(),
      formatCreatedAt: dateFormat(Date.now()),
    });

    return res.status(200).json({
      reviewId: id,
    });
  } catch (error) {
    console.log(error);
  }
};
