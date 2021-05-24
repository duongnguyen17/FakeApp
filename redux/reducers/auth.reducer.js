import {authAction, userAction} from '../constants/constants';
const defaultState = {
  _id: '',
  phonenumber: '',
  password: '',
  token: '',
  username: '',
  avatar: '',
  error: '',
};
const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case authAction.SIGNUP_SUCCESS:
      state = {
        ...state,
        _id: action.payload.user._id,
        phonenumber: action.payload.phonenumber,
        password: action.payload.password,
        token: action.payload.user.token,
        username: action.payload.username,
        avatar: action.payload.user.avatar,
      };
      return state;
    case authAction.SIGNUP_FAILURE:
      state = {
        ...state,
        phonenumber: action.payload.phonenumber,
        password: action.payload.password,
        username: action.payload.username,
        error: action.payload.message,
      };
      return state;
    case authAction.LOGIN_SUCCESS:
      state = {
        ...state,
        _id: action.payload.user._id,
        phonenumber: action.payload.phonenumber,
        password: action.payload.password,
        token: action.payload.user.token,
        username: action.payload.user.username,
        avatar: action.payload.user.avatar,
      };
      return state;
    case authAction.LOGIN_FAILURE:
      state = {
        ...state,
        phonenumber: action.payload.phonenumber,
        password: action.payload.password,
        error: action.payload.message,
      };
      return state;
    case userAction.CHANGE_INFOR:
      state = {
        ...state,
        phonenumber: action.payload.phonenumber,
        password: action.payload.password,
        username: action.payload.username,
        avatar: action.payload.avatar,
      };
      return state;
    default:
      return state;
  }
};
export default reducer;
