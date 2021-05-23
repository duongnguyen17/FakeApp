import {combineReducers} from 'redux';
import authReducer from './auth.reducer';
import postReducer from './post.reducer';
const reducer = combineReducers({
  auth: authReducer,
  post: postReducer,
});
export default reducer;
