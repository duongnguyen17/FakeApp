import {authAction, userAction} from '../constants/constants';
const defaultState = {
  _id: '',
  phonenumber: '',
  password: '',
  token: '',
  username: '',
  avatar: '',
  error: '',
  notificationUnseen: 0,
  notification: [],
};
const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case authAction.SIGNUP_SUCCESS:
      state = {
        ...state,
        _id: action.payload._id,
        phonenumber: action.payload.phonenumber,
        password: action.payload.password,
        token: action.payload.token,
        username: action.payload.username,
        avatar: action.payload.avatar,
      };
      return state;
    case authAction.SIGNUP_FAILURE:
      state = {
        ...state,
        error: action.payload,
      };
      return state;
    case authAction.LOGIN_SUCCESS:
      state = {
        ...state,
        _id: action.payload._id,
        phonenumber: action.payload.phonenumber,
        password: action.payload.password,
        token: action.payload.token,
        username: action.payload.username,
        avatar: action.payload.avatar,
        error: '',
      };
      return state;
    case authAction.LOGIN_FAILURE:
      state = {
        ...state,
        error: action.payload,
      };
      return state;
    case userAction.LOGOUT:
      state = {
        ...state,
        _id: '',
        phonenumber: '',
        password: '',
        token: '',
        username: '',
        avatar: '',
        error: '',
      };
      return state;
    case authAction.CHANGE_AUTH:
      // console.log(`object`, action.payload);
      state = {
        ...state,
        username: action.payload.username,
        avatar: action.payload.avatar,
      };
      return state;
    case userAction.GET_NOTIFICATION:
      state = {
        ...state,
        notification: action.payload,
      };
      return state;
    case userAction.GET_NOTIFICATIONUNSEEN:
      state = {
        ...state,
        notificationUnseen: action.payload,
      };
      return state;
    default:
      return state;
  }
};
export default reducer;
