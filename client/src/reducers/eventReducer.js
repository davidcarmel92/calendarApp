import { SET_CURRENT_DAY_DATA, CHANGE_SELECTED_DAY, GET_MONTH_EVENTS, UPDATE_EVENT, TOGGLE_EVENT_FORM, ADD_NEW_EVENT, DELETE_EVENT, SELECT_EVENT } from '../actions/types';

const initialState = {
  events: [],
  eventFormOpen: false,
  eventSelected: null
}

export default function(state = initialState, action) {
  switch(action.type){
    case GET_MONTH_EVENTS:
      return {
        ...state,
        events: action.payload
      }
    case TOGGLE_EVENT_FORM:
      return {
        ...state,
        eventFormOpen: action.payload
      }
    case CHANGE_SELECTED_DAY:
      return {
        ...state,
        eventFormOpen: false
      }
    case ADD_NEW_EVENT:
      return {
        ...state,
        events: [...state.events, action.payload],
        eventFormOpen: false
      }
    case SELECT_EVENT:
      return {
        ...state,
        eventSelected: action.payload
      }
    case DELETE_EVENT:
      return {
        ...state,
        events: state.events.filter(ev => ev._id !== action.payload._id)
      }
    case UPDATE_EVENT:
      const filteredEvents = state.events.filter(ev => ev._id !== action.payload._id);
      return {
        ...state,
        events: [...filteredEvents, action.payload],
        eventFormOpen: false
      }
    default:
      return state;
  }
}
