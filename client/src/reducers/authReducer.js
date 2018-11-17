import {SET_CURRENT_USER, GET_PROFILE_ID} from '../actions/types';
import isEmpty from '../validation/is-empty';


const initialState = {
  isAuthenticated: false,
  user: {}
}

export default function(state = initialState, action) {
  switch(action.type){
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload
      }
    case GET_PROFILE_ID:
      return {
        ...state,
        user: {
          ...state.user,
          profile_id: action.payload
        }
      }
    default:
      return state;
  }
}
