import {userAction} from '../constants/constants';

const defaultState = {
  userData: {
    posts: [],
    interestedList: [],
    followList: [],
    _id: '60a4cc444b6ebf339ce3cb5d',
    phonenumber: '0981234578',
    password: '011125e20ebe43728d3a535071a8ebe1',
    username: 'Đức Bằng',
    born: null,
    homeTown: null,
    address: null,
    intro: null,
    avatar: null,
    followNum: 1,
  },
  isOwner: true,
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
    default:
      return state;
  }
};

export default reducer;
