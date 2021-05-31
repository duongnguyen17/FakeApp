import {postAction, userAction} from '../constants/constants';
const defaultState = {
  posts: [
    {
      interestedList: [],
      commentList: [],
      tag: [],
      _id: '',
      authorId: '',
      described: '',
      image: [],
      created: '',
      isClosed: false,
      interestedNum: 0,
      commentNum: 0,
      authorName: '',
      authorAvatar: '',
      __v: 0,
    },
  ],
  post: {
    interestedList: [],
    commentList: [],
    tag: [],
    _id: '',
    authorId: '',
    described: '',
    image: [],
    created: '',
    isClosed: false,
    interestedNum: 0,
    commentNum: 0,
    authorName: '',
    authorAvatar: '',
    __v: 0,
  },
  index: 0,
};
const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case postAction.GET_LIST_POSTS:
      state = {
        ...state,
        posts:
          action.payload.index == 0
            ? action.payload.posts
            : state.posts.concat(action.payload.posts),
        index: action.payload.index,
      };
      //console.log(`GET_LIST_POSTS`, state);
      return state;

    case postAction.ADD_POST:
      //console.log(`action.payload`, action.payload);
      state.posts.unshift(action.payload);
      state = {
        ...state,
        post: action.payload,
      };
      return state;

    case postAction.GET_POST:
      state = {
        ...state,
        post: action.payload,
      };
      return state;

    case postAction.GET_LIST_COMMENTS:
      state = {
        ...state,
        post: {
          ...state.post,
          commentList: action.payload.commentList,
        },
      };
      //console.log(`state.post.commentList`, state.post.commentList);
      return state;

    case postAction.CLOSE_POST:
      // let newPosts = state.posts.map(element => {
      //   if (element._id == action.payload._id) {
      //     element.isClosed = action.payload.isClosed;
      //   }
      //   return element;
      // });
      if (state.post._id == action.payload._id) {
        state = {
          ...state,
          posts: state.posts.map(element => {
            if (element._id == action.payload._id) {
              element.isClosed = action.payload.isClosed;
            }
            return element;
          }),
          post: {
            ...state.post,
            isClosed: action.payload.isClosed,
          },
        };
      } else {
        state = {
          ...state,
          posts: state.posts.map(element => {
            if (element._id == action.payload._id) {
              element.isClosed = action.payload.isClosed;
            }
            return element;
          }),
        };
      }

      console.log(`CLOSE_POST`, state);
      return state;

    case postAction.INTERESTED_POST:
      //console.log(`action.payload`, action.payload);
      state.posts = state.posts.map(element => {
        if (element._id == action.payload._id) {
          element.interestedList = action.payload.interestedList;
          element.interestedNum = action.payload.interestedNum;
        }
        return element;
      });
      state = {...state};
      return state;

    case postAction.DELETE_POST:
      state.posts = state.posts.filter(element => {
        element._id != action.payload._id;
      });
      state = {...state};
      return state;

    case postAction.COMMENT_POST:
      let posts = state.posts.map(element => {
        if (element._id == action.payload.postId) {
          element.commentNum = action.payload.commentNum;
        }
        return element;
      });
      let post = state.post;
      post.commentList.push(action.payload.comment);
      post.commentNum = action.payload.commentNum;
      state = {...state, posts: posts, post: post};
      return state;

    case postAction.DELETE_COMMENT:
      state = state.map(element => {
        if (element._id == action.payload.postId) {
          element.commentList = element.commentList.map(value => {
            if (
              !(
                value == action.payload.commentId ||
                value._id == action.payload.commentId
              )
            )
              return value;
          });
        }
        return element;
      });
      return state;
    case postAction.GET_LIST_INTERESTED:
      state = state.map(element => {
        if (element._id == action.payload.postId) {
          element.interestedList = action.payload.interestedList;
        }
        return element;
      });
      return state;
    case userAction.LOGOUT:
      state = {
        ...state,

        posts: [
          {
            interestedList: [],
            commentList: [],
            tag: [],
            _id: '',
            authorId: '',
            described: '',
            image: [],
            created: '',
            isClosed: false,
            interestedNum: 0,
            commentNum: 0,
            authorName: '',
            authorAvatar: '',
            __v: 0,
          },
        ],
        post: {
          interestedList: [],
          commentList: [],
          tag: [],
          _id: '',
          authorId: '',
          described: '',
          image: [],
          created: '',
          isClosed: false,
          interestedNum: 0,
          commentNum: 0,
          authorName: '',
          authorAvatar: '',
          __v: 0,
        },
        index: 0,
      };
      return state;
    default:
      return state;
  }
};
export default reducer;
