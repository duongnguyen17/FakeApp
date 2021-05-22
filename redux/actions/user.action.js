import {userAction, BASE_URL} from '../constants/constants.js';
import {apiConstantsCode} from '../constants/api.constants.js';
import axios from 'axios';

//lấy thông tin người dùng
export const getUserInfor = (token, userId) => async dispatch => {
  const taskURI = `${BASE_URL}/user/get_user_infor?token=${token}&userId=${userId}`;
  try {
    const res = await axios.get(taskURI);
    if (res.data.code === apiConstantsCode.OK) {
      dispatch(getUserInforSuccess(res.data.data));
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
export const getUserInforSuccess = data => ({
  type: userAction.GET_USER_INFOR,
  payload: data,
});

export const changeUserInforSuccess = data => ({
  type: userAction.CHANGE_INFOR,
  payload: data,
});
