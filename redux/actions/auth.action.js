import {authAction, BASE_URL, userAction} from '../constants/constants.js';
import {apiConstantsCode} from '../constants/api.constants.js';
import axios from 'axios';

//signup
export const signup = (phonenumber, password, username) => async dispatch => {
  const taskURI = `${BASE_URL}/signup?phonenumber=${phonenumber}&password=${password}&username=${username}`;
  let data = {phonenumber: phonenumber, password: password, username: username};
  try {
    const res = await axios.post(taskURI);
    if (res.data.code === apiConstantsCode.OK) {
      data = {
        ...data,
        ...res.data.data,
      };
      dispatch(signupSuccess(data));
    } else {
      dispatch(signupFailure(res.data.message));
    }
  } catch (error) {
    dispatch(signupFailure(error.message));
  }
};

//login
export const login = (phonenumber, password) => async dispatch => {
  const taskURI = `${BASE_URL}/login?phonenumber=${phonenumber}&password=${password}`;
  let data = {phonenumber: phonenumber, password: password};
  //console.log(data);
  try {
    const res = await axios.post(taskURI);
    if (res.data.code === apiConstantsCode.OK) {
      data = {
        ...data,
        ...res.data.data,
      };
      dispatch(loginSuccess(data));
    } else {
      dispatch(loginFailure(res.data.message));
    }
  } catch (error) {
    dispatch(loginFailure(error.message));
  }
};

export const logout = token => async dispatch => {
  const taskURI = `${BASE_URL}/user/logout?token=${token}`;
  try {
    const res = await axios.post(taskURI);
    if (res.data.code === apiConstantsCode.OK) {
      dispatch(logoutSuccess());
    } else {
      throw new Error(res.data.message);
    }
  } catch (error) {
    console.log(error.message);
  }
};
export const logoutSuccess = () => ({
  type: userAction.LOGOUT,
});
export const signupSuccess = data => {
  return {
    type: authAction.SIGNUP_SUCCESS,
    payload: data,
  };
};

export const signupFailure = data => {
  return {
    type: authAction.SIGNUP_FAILURE,
    payload: data,
  };
};

export const loginSuccess = data => {
  return {
    type: authAction.LOGIN_SUCCESS,
    payload: data,
  };
};

export const loginFailure = data => {
  return {
    type: authAction.LOGIN_FAILURE,
    payload: data,
  };
};
