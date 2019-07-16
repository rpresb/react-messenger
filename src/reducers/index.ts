import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import AppReducer from './AppReducer';
import RegisterReducer from './RegisterReducer';

export default combineReducers({
  app: AppReducer,
  auth: AuthReducer,
  register: RegisterReducer
});