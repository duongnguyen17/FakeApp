import {userAction, BASE_URL} from '../constants/constants.js';
import {apiConstantsCode} from '../constants/api.constants.js';
import axios from 'axios';

//lấy thông tin người dùng
export const getUserInfor = (token, userId) => async dispatch => {
  const taskURI = `${BASE_URL}/user/get_user_infor?token=${token}&userId=${userId}`;
  //console.log(`taskURI`, taskURI);
  try {
    const res = await axios.get(taskURI);
    //console.log(`res.data`, res.data);
    if (res.data.code === apiConstantsCode.OK) {
      dispatch(getUserInforSuccess(res.data.data));
    } else {
      throw new Error(res.data.message);
    }
  } catch (error) {
    console.log(error);
  }
};
//lấy các bài viết của người dùng
export const getUserPost = (token, userId, index) => async dispatch => {
  const taskURI = `${BASE_URL}/post/get_list_posts?token=${token}&index=${index}&userId=${userId}`;
  try {
    const res = await axios.get(taskURI);
    if (res.data.code === apiConstantsCode.OK) {
      dispatch(getUserPostSuccess(res.data.data));
    } else {
      throw new Error(res.data.message);
    }
  } catch (error) {
    console.log(error);
  }
};

//thay đổi thông tin người dùng
export const changeUserInfor = (token, data) => async dispatch => {
  const taskURI = `${BASE_URL}/user/change_user_infor?token=${token}`;
  try {
    const res = await axios.post(taskURI, data); //trả về thông tin người dùng mới
    if (res.data.code === apiConstantsCode.OK) {
      dispatch(changeUserInforSuccess(res.data.data));
    } else {
      throw new Error(res.data.message);
    }
  } catch (error) {
    console.log(error);
  }
};

//lấy danh sách bài viết mà người dùng quan tâm
export const getListInterested = (token, index) => async dispatch => {
  const taskURI = `${BASE_URL}/user/get_list_interested?token=${token}&index=${index}`;
  try {
    const res = await axios.get(taskURI);
    if (res.data.code === apiConstantsCode.OK) {
      dispatch(getListInterestedSuccess(res.data.data));
    } else {
      throw new Error(res.data.message);
    }
  } catch (error) {
    console.log(error);
  }
};

//follow người khác
export const followOther = (token, userId) => async dispatch => {
  const taskURI = `${BASE_URL}/user/follow_other?token=${token}&userId=${userId}`;
  try {
    const res = await axios.post(taskURI);
    if (res.data.code === apiConstantsCode.OK) {
      dispatch(followOtherSuccess(res.data.data));
    } else {
      throw new Error(res.data.message);
    }
  } catch (error) {
    console.log(error);
  }
};
//lấy danh sách những người đã follow
export const getListFollow = token => async dispatch => {
  const taskURI = `${BASE_URL}/user/get_list_follow?token=${token}`;
  try {
    const res = await axios.post(taskURI);
    if (res.data.code === apiConstantsCode.OK) {
      dispatch(getListFollowSuccess(res.data.data));
    } else {
      throw new Error(res.data.message);
    }
  } catch (error) {
    console.log(error);
  }
};

export const logout = token => async dispatch => {
  const taskURI = `${BASE_URL}/user/logout?token=${token}`;
  try {
    await axios.post(taskURI);
    dispatch(logoutSuccess);
  } catch (error) {
    console.log(error);
  }
};
export const getUserInforSuccess = data => ({
  type: userAction.GET_USER_INFOR,
  payload: data,
});

export const changeUserInforSuccess = data => ({
  type: userAction.CHANGE_INFOR,
  payload: data,
});

//lấy danh sách bài viết mà người dùng quan tâm
export const getListInterestedSuccess = data => ({
  type: userAction.GET_LIST_INTERESTED,
  payload: data,
});

export const followOtherSuccess = data => ({
  type: userAction.FOLLOW_OTHER,
  payload: data,
});

export const getListFollowSuccess = data => ({
  type: userAction.GET_LIST_FOLLOW,
  payload: data,
});

export const logoutSuccess = () => ({
  type: userAction.LOGOUT,
});

export const getUserPostSuccess = data => ({
  type: userAction.GET_USER_POST,
  payload: data,
});
