import Review from '../models/Review';

export const insertReview = async (req, res) => {
  console.log(req.body);

  const {
    body: { emotion, title, content, star, movieId, spoiled },
  } = req;

  try {
    const newReview = await Review.create({
      movieId,
      title,
      emotion,
      star,
      content,
      spoiled,
      user: req.user.id,
    });
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
    const reviews = await Review.find({}).sort({ createdAt: 'desc' });

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
    const review = await Review.findById(id);

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
    console.log(index);
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
