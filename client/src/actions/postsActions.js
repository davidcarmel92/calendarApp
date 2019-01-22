import axios from 'axios';

import { CLEAR_ERRORS, GET_POSTS, GET_POST } from './types';

export const getPostsByCategory = (category) => dispatch => {
  dispatch(clearErrors());
  axios.get(`/api/posts/category/${category}`)
    .then(res => dispatch({
      type: GET_POSTS,
      payload: res.data
    }))
    .catch(err => dispatch({
      type: GET_POSTS,
      payload: null
    }));
}

export const getPostById = (postId) => dispatch => {
  dispatch(clearErrors());
  axios.get(`/api/posts/${postId}`)
    .then(res => dispatch({
      type: GET_POST,
      payload: res.data
    }))
    .catch(err => dispatch({
      type: GET_POST,
      payload: null
    }));
}

export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  }
}
