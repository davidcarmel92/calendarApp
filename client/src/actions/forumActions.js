import axios from 'axios';

import { GET_POSTS_BY_CATEGORY, CLEAR_ERRORS, GET_POSTS } from './types';

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

export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  }
}
