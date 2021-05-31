import {postAction, BASE_URL} from '../constants/constants.js';
import {apiConstantsCode} from '../constants/api.constants.js';
import axios from 'axios';

//lấy danh sách bài viết
export const getListPost = (token, index, userId) => async dispatch => {
  let taskURI = '';
   if (index == null || index == undefined) index = 0;
  if (userId == undefined)
    taskURI = `${BASE_URL}/post/get_list_posts?token=${token}&index=${index}`;
  else
    taskURI = `${BASE_URL}/post/get_list_posts?token=${token}&index=${index}&userId=${userId}`;
  //console.log(`taskURI`, taskURI);
  try {
    const res = await axios.get(taskURI);
    //console.log(`res.data`, res.data);
    //nếu lấy về thành công
    if (res.data.code === apiConstantsCode.OK) {
      let data = {
        posts: res.data.data,
        index: index,
      };
      dispatch(fetchPostsSuccess(data));
    } else {
      throw Error(res.data.message);
    }
  } catch (error) {
    console.log(error);
  }
};

//đăng bài
export const addPost = (token, data) => async dispatch => {
  const taskURI = `${BASE_URL}/post/add_post?token=${token}`;
  try {
    let res = await axios.post(taskURI, data); //nhận về data của bài viết vừa đăng
    let result = {};
    //console.log(`res.data`, res.data);
    if (res.data.code === apiConstantsCode.OK) {
      result = res.data.data;
    }
    dispatch(addPostSuccess(result));
  } catch (error) {
    console.log(error);
  }
};
//lấy thông tin bài viết
export const getPost = (token, postId) => async dispatch => {
  const taskURI = `${BASE_URL}/post/get_post?token=${token}&postId=${postId}`;
  //console.log(`taskURI`, taskURI);
  try {
    const res = await axios.get(taskURI);
    if (res.data.code === apiConstantsCode.OK) {
      //console.log(`res.data.data`, res.data.data);
      dispatch(getPostSuccess(res.data.data));
    } else {
      throw Error(res.data.message);
    }
  } catch (error) {
    console.log(error);
  }
};

//close post trả về thông tin bài viết sau khi chỉnh sửa
export const closePost = (token, postId) => async dispatch => {
  const taskURI = `${BASE_URL}/post/close_post?token=${token}&postId=${postId}`;
  try {
    const res = await axios.post(taskURI);
    if (res.data.code === apiConstantsCode.OK) {
      dispatch(closePostSuccess(res.data.data));
    } else {
      throw Error(res.data.message);
    }
  } catch (error) {
    console.log(error);
  }
};

// quan tâm bài viết
export const interestedPost = (token, postId) => async dispatch => {
  const taskURI = `${BASE_URL}/post/interested_post?token=${token}&postId=${postId}`;
  try {
    const res = await axios.post(taskURI);
    let data = {};
    if (res.data.code === apiConstantsCode.OK) {
      data = res.data.data;
    }
    dispatch(interestedPostSuccess(data));
  } catch (error) {
    console.log(error);
  }
};

//xóa bài viết
export const deletePost = (token, postId) => async dispatch => {
  const taskURI = `${BASE_URL}/post/delete_post?token=${token}&postId=${postId}`;

  try {
    const res = await axios.post(taskURI); //nếu xóa thành công thì trả lại id bài viết
    if (res.data.code === apiConstantsCode.OK) {
      let data = res.data.data;
      dispatch(deletePostSuccess(data));
    } else {
      throw new Error(res.data.message);
    }
  } catch (error) {
    console.log(error);
  }
};

//comment post
export const commentPost = (token, postId, data) => async dispatch => {
  const taskURI = `${BASE_URL}/post/comment_post?token=${token}&postId=${postId}`;
  //console.log(`taskURI`, taskURI);
  try {
    //console.log(`data`, data);
    const res = await axios.post(taskURI, data); //trả về data của comment đó
    //console.log(`res.data`, res.data);
    if (res.data.code === apiConstantsCode.OK) {
      let data = {
        postId: postId,
        ...res.data.data,
      };
      dispatch(commentPostSuccess(data));
    } else {
      throw new Error(res.data.message);
    }
  } catch (error) {
    console.log(error);
  }
};

//delete comment
export const deleteComment = (token, commentId) => async dispatch => {
  const taskURI = `${BASE_URL}/post/delete_comment?token=${token}&commentId=${commentId}`;
  try {
    const res = await axios.post(taskURI);
    if (res.data.code === apiConstantsCode.OK) {
      let data = res.data.data; // id của comment đã được xóa
      dispatch(deleteCommentSuccess(data));
    } else {
      throw new Error(res.data.message);
    }
  } catch (error) {
    console.log(error);
  }
};
//lấy danh sách comment của bài viết
export const getListComment = (token, postId) => async dispatch => {
  const taskURI = `${BASE_URL}/post/get_list_comments?token=${token}&postId=${postId}`;
  try {
    const res = await axios.get(taskURI);
    if (res.data.code === apiConstantsCode.OK) {
      let data = {
        _id: postId,
        commentList: res.data.data,
      };
      //console.log(`CommentList`, data);
      dispatch(getListCommentSuccess(data));
    } else {
      throw new Error(res.data.message);
    }
  } catch (error) {
    console.log(error.message);
  }
};

//lấy danh sách người dùng đã quan tâm bài viết
export const getListInterested = (token, postId) => async dispatch => {
  const taskURI = `${BASE_URL}/post/get_list_interested?token=${token}&postId=${postId}`;
  try {
    const res = await axios.get(taskURI);
    if (res.data.code === apiConstantsCode.OK) {
      let data = res.data.data; //danh sách người dùng đã quan tâm (là 1 obj bao gồm _id và username)
      dispatch(getListInterestedSuccess(data));
    } else {
      throw new Error(res.data.message);
    }
  } catch (error) {
    console.log(error);
  }
};

export const fetchPostsSuccess = data => ({
  type: postAction.GET_LIST_POSTS,
  payload: data,
});

export const addPostSuccess = data => ({
  type: postAction.ADD_POST,
  payload: data,
});

export const getPostSuccess = data => ({
  type: postAction.GET_POST,
  payload: data,
});

export const closePostSuccess = data => ({
  type: postAction.CLOSE_POST,
  payload: data,
});

export const interestedPostSuccess = data => ({
  type: postAction.INTERESTED_POST,
  payload: data,
});

export const deletePostSuccess = data => ({
  type: postAction.DELETE_POST,
  payload: data, //data là postId
});

export const commentPostSuccess = data => ({
  type: postAction.COMMENT_POST,
  payload: data,
});

export const deleteCommentSuccess = data => ({
  type: postAction.DELETE_COMMENT,
  payload: data, //id của comment đã được xóa
});

export const getListInterestedSuccess = data => ({
  type: postAction.GET_LIST_INTERESTED,
  payload: data, //danh sách các user đã quan tâm bài viết
});

export const getListCommentSuccess = data => ({
  type: postAction.GET_LIST_COMMENTS,
  payload: data,
});
