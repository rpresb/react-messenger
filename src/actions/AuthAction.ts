import firebase from "firebase/app";
export const LOGIN_START = 'LOGIN_START';
export const LOGIN_FAILED = 'LOGIN_FAILED';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGOUT = 'LOGOUT';

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

export const logoutUser = () => async (dispatch: Function) => {
  await firebase.auth().signOut();
  dispatch({ type: LOGOUT });
};
