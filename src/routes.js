const HOME = '/';

// auth

const AUTH = '/api/auth';
const JOIN = '/join/local';
const LOGIN = '/login/local';
const LOGOUT = '/logout';
const EXISTS = '/exists/:key(email|username)/:value';
const CHECK = '/check';
const TEMPPWCHANGE = '/tempPwChange';
const CHECK_PASSWORD = '/checkPassword';

// review
const REVIEWS = '/api/reviews';
const LIST = '/:key/list';
const UPLOAD = '/upload';
const REVIEW_DETAIL = '/:id';
const EDIT_REVIEW = '/edit-review';
const DELETE_REVIEW = '/:id/delete';
const MOVIE_REVIEW_LIST = '/movie/:id';
const LIKE_REVIEW = '/:id/like-review';
const DISLIKE_REVIEW = '/:id/dislike-review';

// user
const USERS = '/api/users';
const USER_DETAIL = '/:id';
const EDIT_PROFILE = '/edit-profile';
const CHANGE_PASSWORD = '/change-password';
const UPLOAD_THUMBNAIL = '/upload/thumbnail';
const DROPOUT_USER = '/dropOut/:id';

// comment
const COMMENTS = '/api/comments';
const CREATE_COMMENT = '/create';
const REVIEW_COMMENTS = '/:id';
const DELETE_COMMENT = '/delete';
const UPDATE_COMMENT = '/update';

const API = '/api';

// Naver
const NAVER_LOGIN = '/naver';
const NAVER_LOGIN_CALLBACK = '/naver/callback';

// Kakao
// const KAKAO_LOGIN = '/kakao'

// Google
const GOOGLE_LOGIN = '/google';

const routes = {
  home: HOME,
  auth: AUTH,
  join: JOIN,
  login: LOGIN,
  logout: LOGOUT,
  exists: EXISTS,
  check: CHECK,
  tempPwChange: TEMPPWCHANGE,
  checkPassword: CHECK_PASSWORD,
  users: USERS,
  userDetail: USER_DETAIL,
  editProfile: EDIT_PROFILE,
  changePassword: CHANGE_PASSWORD,
  uploadThumbnail: UPLOAD_THUMBNAIL,
  dropOutUser: DROPOUT_USER,
  reviews: REVIEWS,
  upload: UPLOAD,
  reviewDetail: REVIEW_DETAIL,
  deleteReview: DELETE_REVIEW,
  editReview: EDIT_REVIEW,
  movieReviewList: MOVIE_REVIEW_LIST,
  likeReview: LIKE_REVIEW,
  dislikeReview: DISLIKE_REVIEW,
  comments: COMMENTS,
  reviewComments: REVIEW_COMMENTS,
  deleteComment: DELETE_COMMENT,
  updateComment: UPDATE_COMMENT,
  createComment: CREATE_COMMENT,
  list: LIST,
  api: API,
  naverLogin: NAVER_LOGIN,
  naverLoginCallback: NAVER_LOGIN_CALLBACK,
  googleLogin: GOOGLE_LOGIN,
};

export default routes;
