const HOME = '/';

// auth

const AUTH = '/api/auth';
const JOIN = '/join/local';
const LOGIN = '/login/local';
const LOGOUT = '/logout';
const EXISTS = '/exists/:key(email|username)/:value';
const CHECK = '/check';
const TEMPPWCHANGE = '/tempPwChange';

// review
const REVIEWS = '/api/reviews';
const LIST = '/list';
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

const API = '/api';

const routes = {
  home: HOME,
  auth: AUTH,
  join: JOIN,
  login: LOGIN,
  logout: LOGOUT,
  exists: EXISTS,
  check: CHECK,
  tempPwChange: TEMPPWCHANGE,
  users: USERS,
  userDetail: (id) => {
    if (id) {
      return `/users/${id}`;
    }
    return USER_DETAIL;
  },
  editProfile: EDIT_PROFILE,
  changePassword: CHANGE_PASSWORD,
  reviews: REVIEWS,
  upload: UPLOAD,
  reviewDetail: REVIEW_DETAIL,
  deleteReview: DELETE_REVIEW,
  editReview: EDIT_REVIEW,
  movieReviewList: MOVIE_REVIEW_LIST,
  likeReview: LIKE_REVIEW,
  dislikeReview: DISLIKE_REVIEW,
  list: LIST,
  api: API,
};

export default routes;
