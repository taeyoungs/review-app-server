import Review from '../models/Review';
import User from '../models/User';
import dateFormat from '../lib/dateFormat';

export const insertReview = async (req, res) => {
  // console.log(req.body);

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
  const {
    params: { key, page },
  } = req;

  try {
    let reviews = [];
    if (key === 'recent') {
      reviews = await Review.find({})
        .populate('user')
        .sort({ createdAt: 'desc' })
        .limit(page * 5);
    } else {
      reviews = await Review.find({})
        .populate('user')
        .sort({ views: 'desc' })
        .limit(page * 5);
    }

    const cnt = await Review.find({}).countDocuments();
    // console.log(cnt);

    // console.log(reviews);
    return res.status(200).json({
      reviews,
      full: reviews.length === cnt ? 'true' : 'false',
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
    // console.log(review);

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
      (review) => String(review.movie.movieId) === id,
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

// 1. 로그인한 유저 likeReview array에 push 후 save
// 2. review에 views++
export const likeReview = async (req, res) => {
  const {
    params: { id },
  } = req;

  try {
    await Review.findById(id, (err, doc) => {
      if (err) console.log(err);
      doc.views += 1;
      doc.save();
    });
    req.user.likeReview.push(id);
    req.user.save();
    return res.status(200).json({
      likeReview: req.user.likeReview,
    });
  } catch (error) {
    console.log(error);
  }
};

export const dislikeReview = async (req, res) => {
  const {
    params: { id },
  } = req;

  try {
    await Review.findById(id, (err, doc) => {
      if (err) console.log(err);
      if (doc.views === 0) {
        doc.views = 0;
      } else {
        doc.views -= 1;
      }
      doc.save();
    });

    req.user.likeReview = req.user.likeReview.filter(
      (reviewId) => id !== String(reviewId),
    );
    req.user.save();
    return res.status(200).json({
      likeReview: req.user.likeReview,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getReviewPaging = async (req, res) => {
  const {
    query: { key, len, id, page },
  } = req;

  const start = (parseInt(page) - 1) * 5;
  let end = parseInt(page) * 5;
  if (parseInt(page) * 5 > parseInt(len)) {
    end = parseInt(len);
  }

  let reviews = [];
  try {
    // 1. 1페이지 (첫 클릭) 2. 페이지 번호 클릭
    if (key === 'wrote') {
      if (start === 0) {
        reviews = await Review.find({ user: id })
          .sort({ createdAt: 'desc' })
          .limit(5);
      } else {
        reviews = await Review.find({ user: id })
          .sort({ createdAt: 'desc' })
          .skip(start)
          .limit(5);
      }
    } else {
      const user = await User.findOne({ _id: id }).populate('likeReview');
      reviews = user.likeReview.slice(start, end);
    }

    return res.status(200).json({
      reviews,
    });
  } catch (error) {
    console.log(error);
  }
};
