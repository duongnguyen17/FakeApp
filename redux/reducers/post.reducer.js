import {postAction} from '../constants/constants';
const defaultState = [
  {
    interestedList: [],
    commentList: [],
    tag: [],
    _id: '',
    authorId: '',
    described: null,
    image: [],
    created: '',
    isClosed: false,
    interestedNum: 0,
    commentNum: 0,
    authorName: '',
    authorAvatar: null,
    __v: 0,
  },
];
const reducer = (state, action) => {
  switch (action.type) {
    case postAction.GET_LIST_POSTS:
      if (state.length === 1) {
        state.shift();
      } else {
        state = state.concat(action.payload);
      }
      return state;

    case postAction.ADD_POST:
      state = state.unshift(...action.payload);
      return state;

    case postAction.GET_POST:
      let _id = action.payload._id;
      state = state.map(element => {
        if (element._id == _id) {
          return action.payload;
        } else {
          return element;
        }
      });
      return state;

    case postAction.CLOSE_POST:
      let _id = action.payload._id;
      state = state.map(element => {
        if (element._id == _id) {
          element.isClosed = action.payload.isClosed;
        }
        return element;
      });
      return state;

    case postAction.INTERESTED_POST:
      let _id = action.payload._id;
      state = state.map(element => {
        if (element._id == _id) {
          return action.payload;
        } else {
          return element;
        }
      });
      return state;

    case postAction.DELETE_POST:
      let _id = action.payload._id;
      state = state.filter(element => {
        element._id != _id;
      });
      return state;

    case postAction.COMMENT_POST:
      let postId = action.payload.postId;
      state = state.map(element => {
        if (element._id == postId) {
          element.commentList.push(action.payload);
        }
        return element;
      });
      return state;

    case postAction.DELETE_COMMENT:
      let postId = action.payload.postId;
      let commentId = action.payload.commentId;
      state = state.map(element => {
        if (element._id == postId) {
          element.commentList = element.commentList.map(value => {
            if (!(value == commentId || value._id == commentId)) return value;
          });
        }
        return element;
      });
      return state;
    case postAction.GET_LIST_INTERESTED:
      let postId = action.payload.postId;
      state = state.map(element => {
        if (element._id == postId) {
          element.interestedList = action.payload.interestedList;
        }
        return element;
      });
      return state;

    default:
      return state;
  }
};
export default reducer;
