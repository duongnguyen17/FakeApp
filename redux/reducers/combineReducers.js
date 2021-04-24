import {combineReducers} from 'redux';
import authReducer from './auth.reducer';

const reducer = combineReducers({
  user: authReducer,
});
export default reducer;
