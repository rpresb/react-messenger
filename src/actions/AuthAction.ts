import firebase from "firebase";

export const LOGIN_START = 'LOGIN_START';
export const LOGIN_FAILED = 'LOGIN_FAILED';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';

export const loginUser = (email: string, password: string) => async (dispatch: Function) => {
  dispatch({ type: LOGIN_START });

  try {
    await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
    const userCredential = await firebase.auth().signInWithEmailAndPassword(email, password);
    dispatch(loginSuccess(userCredential.user!));
  } catch (err) {
    dispatch({ type: LOGIN_FAILED, payload: err.message });
  }

};

export const loginSuccess = (user: firebase.User) => {
  return {
    type: LOGIN_SUCCESS,
    payload: user
  };
}