export const BASE_URL = 'http://192.168.21.70:3000/fakeapp';
export const authAction = {
  SIGNUP_SUCCESS: 'SIGNUP_SUCCESS',
  SIGNUP_FAILURE: 'SIGNUP_FAILURE',
  LOGIN_FAILURE: 'LOGIN_FAILURE',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  CHANGE_AUTH: 'CHANGE_AUTH',
};

export const postAction = {
  ADD_POST: 'ADD_POST',
  CLOSE_POST: 'CLOSE_POST',
  DELETE_COMMENT: 'DELETE_COMMENT',
  DELETE_POST: 'DELETE_POST',
  GET_LIST_POSTS: 'GET_LIST_POSTS',
  GET_POST: 'GET_POST',
  INTERESTED_POST: 'LIKE_POST',
  COMMENT_POST: 'COMMENT_POST',
  GET_LIST_INTERESTED: 'GET_LIST_INTERESTED',
  GET_LIST_COMMENTS: 'GET_LIST_COMMENTS',
};
export const userAction = {
  GET_USER_INFOR: 'GET_USER_INFOR',
  GET_USER_POST: 'GET_USER_POST',
  CHANGE_INFOR: 'CHANGE_INFOR',
  LOGOUT: 'LOGOUT',
  GET_LIST_INTERESTED: 'GET_LIST_INTERESTED',
  FOLLOW_OTHER: 'FOLLOW_OTHER',
  GET_LIST_FOLLOW: 'GET_LIST_FOLLOW',
  GET_NOTIFICATION: ' GET_NOTIFICATION',
  SEE_NOTIFICATION: 'SEE_NOTIFICATION',
  GET_NOTIFICATIONUNSEEN: 'GET_NOTIFICATIONUNSEEN',
};
