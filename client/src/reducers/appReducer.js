import { SET_CURRENT_DAY_DATA, CHANGE_SELECTED_DAY, LOADING, GET_MONTH_EVENTS } from '../actions/types';

const initialState = {
  currentDay: null,
  selectedDay: null,
  currentMonth: null,
  currentYear: null,
  daysInMonth: null,
  firstDay: null,
  lastMonthDays: null,
  loading: false
}

export default function(state = initialState, action) {
  switch(action.type){
    case SET_CURRENT_DAY_DATA:
      return {
        ...state,
        currentDay: action.payload.currentDay,
        selectedDay: action.payload.selectedDay,
        currentMonth: action.payload.currentMonth,
        currentYear: action.payload.currentYear,
        daysInMonth: action.payload.daysInMonth,
        firstDay: action.payload.firstDay,
        lastMonthDays: action.payload.lastMonthDays
      }
    case CHANGE_SELECTED_DAY:
      return {
        ...state,
        selectedDay: action.payload
      }
    case GET_MONTH_EVENTS:
      return {
        ...state,
        loading: false
      }
    case LOADING:
      return {
        ...state,
        loading: true
      }
    default:
      return state;
  }
}
