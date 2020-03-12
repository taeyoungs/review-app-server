// auth

const AUTH = '/auth';
const JOIN = '/join/local';
const LOGIN = '/login/local';
const LOGOUT = '/logout';
const EXISTS = '/exists/:key(email|username)/:value';
const CHECK = '/check';

// review
const REVIEWS = '/api/reviews';
const UPLOAD = '/upload';
const REVIEW_DETAIL = '/:id';
const EDIT_REVIEW = '/edit-review';

// user
const USERS = '/api/users';
const USER_DETAIL = '/:id';
const EDIT_PROFILE = '/edit-profile';
const CHANGE_PASSWORD = '/change-password';

const API = '/api';

const routes = {
  auth: AUTH,
  join: JOIN,
  login: LOGIN,
  logout: LOGOUT,
  exists: EXISTS,
  check: CHECK,
  users: USERS,
  userDetail: id => {
    if (id) {
      return `/users/${id}`;
    }
    return USER_DETAIL;
  },
  editProfile: EDIT_PROFILE,
  changePassword: CHANGE_PASSWORD,
  reviews: REVIEWS,
  upload: UPLOAD,
  reviewDetail: id => {
    if (id) {
      return `/reviews/${id}`;
    }
    return REVIEW_DETAIL;
  },
  editReview: EDIT_REVIEW,
  api: API,
};

export default routes;
