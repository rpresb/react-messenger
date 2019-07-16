import firebase from "firebase";
import {loginUser} from './AuthAction'

export const REGISTER_START = 'REGISTER_START';
export const REGISTER_FAILED = 'REGISTER_FAILED';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';

export const registerUser = (email: string, password: string, repeatPassword: string) => async (dispatch: Function) => {
  dispatch({ type: REGISTER_START });

  try {
    validatePassword(password, repeatPassword);
    await firebase.auth().createUserWithEmailAndPassword(email, password);
    dispatch({ type: REGISTER_SUCCESS });
    loginUser(email, password)(dispatch)
  } catch (err) {
    dispatch({ type: REGISTER_FAILED, payload: err.message });
  }
};

const validatePassword = (password: string, repeatPassword: string) => {
  console.log(password, repeatPassword)
  if(password !== repeatPassword) {
    
    throw new Error("Password mismatch")
  }
} 