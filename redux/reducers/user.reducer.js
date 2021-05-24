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
    token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7Il9pZCI6IjYwYTRjYzQ0NGI2ZWJmMzM5Y2UzY2I1ZCIsInBob25lbnVtYmVyIjoiMDk4MTIzNDU3OCJ9LCJpYXQiOjE2MjE0MTI5MzJ9.Zp9oMLLtkoMYb1xacVhxfNmfALYx8M9cDStSfzoxjpk',
    __v: 0,
  },
  isOwner: 1,
};
const reducer = (state, action) => {
  switch (action.type) {
    case userAction.GET_USER_INFOR:
      return action.payload;
    case userAction.GET_USER_POST:
      state.posts = action.payload;
      return state;
    case userAction.GET_LIST_FOLLOW:
      state.followList = action.payload;
      return state;
    case userAction.FOLLOW_OTHER:
      state.followList.push(action.payload);
      return state;
    case userAction.GET_LIST_INTERESTED:
      state.interestedList = action.payload;
      return state;
    case userAction.CHANGE_INFOR:
      return action.payload;
    default:
      return state;
  }
};

export default reducer;
