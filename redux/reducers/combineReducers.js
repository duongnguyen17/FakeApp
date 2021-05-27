import {combineReducers} from 'redux';
import authReducer from './auth.reducer';
import postReducer from './post.reducer';
import userReducer from './user.reducer';
const reducer = combineReducers({
  auth: authReducer,
  posts: postReducer,
  user: userReducer,
});
export default reducer;
