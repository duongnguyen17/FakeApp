import {userAction} from '../constants/constants';

const defaultState = {
  userData: {
    posts: [],
    interestedList: [],
    followList: [],
    _id: '',
    phonenumber: '',
    password: '',
    username: '',
    born: null,
    homeTown: null,
    address: null,
    intro: null,
    avatar: null,
    followNum: 0,
  },
  isOwner: true,
  isFollow: false,
};
const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case userAction.GET_USER_INFOR:
      state = {
        ...state,
        ...action.payload,
      };
      return state;
    case userAction.GET_LIST_FOLLOW:
      state = {
        ...state,
        userData: {
          ...state.userData,
          followList: action.payload,
        },
      };
      return state;
    case userAction.FOLLOW_OTHER:
      state = {
        ...state,
        userData: {
          ...state.userData,
          followList: state.userData.followList.push(action.payload),
        },
        isFollow: !state.isFollow,
      };
      return state;
    case userAction.GET_LIST_INTERESTED:
      state = {
        ...state,
        userData: {
          ...state.userData,
          interestedList: action.payload,
        },
      };
      return state;
    case userAction.LOGOUT:
      state = {
        ...state,
        userData: {
          posts: [],
          interestedList: [],
          followList: [],
          _id: '',
          phonenumber: '',
          password: '',
          username: '',
          born: null,
          homeTown: null,
          address: null,
          intro: null,
          avatar: null,
          followNum: 1,
        },
        isOwner: true,
        isFollow: false,
      };
      return state;
    default:
      return state;
  }
};

export default reducer;
