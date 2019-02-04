import axios from 'axios';

import { CLEAR_ERRORS, GET_POSTS, GET_POST, GET_ERRORS, GET_CATEGORIES, LOADING } from './types';

export const getPostsByCategory = (category, activePage) => dispatch => {
  dispatch(setLoading());
  axios.get(`/api/posts/category/${category}/${activePage}`)
    .then(res => dispatch({
      type: GET_POSTS,
      payload: res.data
    }))
    .catch(err => dispatch({
      type: GET_POSTS,
      payload: null
    }));
}

export const getCategories = () => dispatch => {
  axios.get(`/api/posts/`)
    .then(res => dispatch({
      type: GET_CATEGORIES,
      payload: res.data
    }))
    .catch(err => dispatch({
      type: GET_CATEGORIES,
      payload: null
    }));
}

export const getPostById = (postId) => dispatch => {
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

export const addPost = (postData, history) => dispatch => {
  dispatch(clearErrors());
  axios.post(`/api/posts/`, postData)
  .then(res => history.push(`/category/${postData.category}`))
  .catch(err => dispatch({
    type: GET_ERRORS,
    payload: err.response.data
  }));
}

export const addComment = (commentId, commentData) => dispatch => {
  dispatch(clearErrors());
  dispatch(setLoading());
  axios.post(`/api/posts/comment/${commentId}`, commentData)
  .then(res => dispatch({
    type: GET_POST,
    payload: res.data
  }))
  .catch(err => dispatch({
    type: GET_ERRORS,
    payload: err.response.data
  }));
}

export const setLoading = () => {
  return {
    type: LOADING
  }
}

export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  }
}
