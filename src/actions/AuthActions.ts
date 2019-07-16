export const LOGIN_START = 'LOGIN_START';

export const loginUser = (email: string, password: string) => {
  return (dispatch: Function) => {
    dispatch({ type: LOGIN_START });

    // call firebase
    //    dispatch again complete or error
  };
};
