import axios from 'axios';

import { GET_PROFILE, PROFILE_LOADING, CLEAR_CURRENT_PROFILE, GET_ERRORS, SET_CURRENT_USER, GET_PROFILES, CLEAR_ERRORS, ADD_BIO } from './types';

export const getCurrentProfile = () => dispatch => {
  axios.get('/api/profile')
    .then(res => dispatch({
      type: GET_PROFILE,
      payload: res.data
    }))
    .catch(err => dispatch({
      type: GET_PROFILE,
      payload: {}
    }))
};

export const getProfileByHandle = handle => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get(`/api/profile/handle/${handle}`)
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PROFILE,
        payload: null
      })
    );
};

export const createProfile = (profileData) => dispatch => {
  dispatch(clearErrors());
  axios.post('/api/profile', profileData)
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};


export const getProfiles = () => dispatch => {
  dispatch(setProfileLoading());
  axios.get(`/api/profile/all`)
    .then(res => dispatch({
      type: GET_PROFILES,
      payload: res.data
    }))
    .catch(err => {
      dispatch({
        type: GET_PROFILES,
        payload: null
      })
    });
}


export const deleteAccount = () => dispatch => {
  if(window.confirm('Are you sure? This can not be undone!')) {
    axios.delete('/api/profile')
      .then(res => {
        dispatch({
          type: SET_CURRENT_USER,
          payload: {}
        })
      })
      .catch(err => {
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      });
  }
}


export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING
  }
}

export const clearCurrentProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE
  }
}

export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  }
}
