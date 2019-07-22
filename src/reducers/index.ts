import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import AppReducer from './AppReducer';
import RegisterReducer from './RegisterReducer';
import ContactsReducer from './ContactsReducer';

export default combineReducers({
  app: AppReducer,
  auth: AuthReducer,
  register: RegisterReducer,
  contact: ContactsReducer
});