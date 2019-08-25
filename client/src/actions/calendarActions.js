import axios from 'axios';

import { SET_CURRENT_DAY_DATA, UPDATE_EVENT, DELETE_EVENT, SELECT_EVENT,  LOADING, CLEAR_ERRORS, CHANGE_SELECTED_DAY, GET_MONTH_EVENTS, TOGGLE_EVENT_FORM, GET_ERRORS, ADD_NEW_EVENT } from './types';


export const setCurrentDayData = data => {
  return {
    type: SET_CURRENT_DAY_DATA,
    payload: data
  }
}

export const changeSelectedDay = day => {
  return {
    type: CHANGE_SELECTED_DAY,
    payload: day
  }
}

export const toggleEventForm = toggle => {
  return {
    type: TOGGLE_EVENT_FORM,
    payload: toggle
  }
}

export const selectEvent = el => {
  return {
    type: SELECT_EVENT,
    payload: el
  }
}

export const addNewEvent = data => dispatch => {
  // dispatch(setLoading());
  axios.post(`/api/events/post`, data)
    .then(res => dispatch({
      type: ADD_NEW_EVENT,
      payload: res.data
    }))
    .catch(err => dispatch({
      type: GET_ERRORS,
      payload: null
    }));
}

export const updateEvent = data => dispatch => {
  // dispatch(setLoading());
  axios.put(`/api/events/post/${data._id}`, data)
    .then(res => dispatch({
      type: UPDATE_EVENT,
      payload: res.data
    }))
    .catch(err => dispatch({
      type: GET_ERRORS,
      payload: null
    }));
}

export const getEventsForMonth = month => dispatch => {
  dispatch(setLoading());
  axios.get(`/api/events/post/${month}`)
    .then(res => dispatch({
      type: GET_MONTH_EVENTS,
      payload: res.data
    }))
    .catch(err => dispatch({
      type: GET_MONTH_EVENTS,
      payload: null
    }));
}

export const deleteEvent = el => dispatch => {
  axios.delete(`/api/events/post/${el._id}`)
    .then(res => dispatch({
      type: DELETE_EVENT,
      payload: res.data
    }))
    .catch(err => dispatch({
      type: GET_ERRORS,
      payload: null
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
