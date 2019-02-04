import {GET_POSTS, GET_POST, GET_CATEGORIES, LOADING} from '../actions/types';

const initialState = {
  posts: [],
  post: null,
  categories: [],
  length: null,
  loading: false
}

export default function(state = initialState, action) {
  switch(action.type){
    case LOADING:
      return {
        ...state,
        loading: true
      }
    case GET_POSTS:
      return {
        ...state,
        posts: action.payload.posts,
        post: null,
        categories: null,
        length: action.payload.length,
        loading: false
      }
    case GET_POST:
      return {
        ...state,
        post: action.payload,
        categories: null,
        loading: false
      }
    case GET_CATEGORIES:
      return {
        ...state,
        posts: null,
        categories: action.payload,
        loading: false
      }
    default:
      return state;
  }
}
