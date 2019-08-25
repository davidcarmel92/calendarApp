import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import appReducer from './appReducer';
import eventReducer from './eventReducer';

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  app: appReducer,
  event: eventReducer
});
