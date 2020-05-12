import Comment from '../models/Comment';
import Review from '../models/Review';
import dateFormat from '../lib/dateFormat';

export const createComment = async (req, res) => {
  const {
    body: { reviewId, content },
  } = req;

  try {
    const cmt = await Comment.create({
      content,
      review: reviewId,
      user: req.user.id,
      createdAt: dateFormat(Date.now()),
    });
    await Review.findById(reviewId, (err, doc) => {
      if (err) console.log(err);
      doc.comment.push(cmt._id);
      doc.save();
    });
    return res.status(200).json({
      msg: 'Success to create comment',
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteComment = async (req, res) => {
  const {
    params: { reviewId, commentId },
  } = req;

  console.log(req.body);

  try {
    await Comment.findByIdAndDelete(commentId);
    await Review.findById(reviewId, (err, doc) => {
      if (err) console.log(err);
      if (doc.comment.length !== 0) {
        doc.comment = doc.comment.filter((cmt) => cmt !== commentId);
        doc.save();
      }
    });
    return res.status(200).json({
      msg: 'Success to delete comment',
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateComment = async (req, res) => {
  const {
    body: { id, content },
  } = req;

  console.log(req.body);

  try {
    await Comment.findByIdAndUpdate(id, {
      content,
    });
    return res.status(200).json({
      msg: 'Success to update comment',
    });
  } catch (error) {
    console.log(error);
  }
};

export const getReviewComments = async (req, res) => {
  const {
    params: { id },
  } = req;

  try {
    const comments = await Comment.find({ review: id })
      .populate('user')
      .sort({ _id: 'desc' });

    return res.status(200).json({
      comments,
    });
  } catch (error) {
    console.log(error);
  }
};
