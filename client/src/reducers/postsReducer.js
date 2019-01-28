import {GET_POSTS, GET_POST} from '../actions/types';
import isEmpty from '../validation/is-empty';


const initialState = {
  posts: [],
  post: null
}

export default function(state = initialState, action) {
  switch(action.type){
    case GET_POSTS:
      return {
        ...state,
        posts: action.payload,
        post: null
      }
    case GET_POST:
      return {
        ...state,
        post: action.payload
      }
    default:
      return state;
  }
}
