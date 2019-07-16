import { LOGIN_START } from "../actions/AuthActions";

const INITIAL_STATE = {
  user: undefined,
  loading: false,
  error: undefined
};

export default (state: any = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case LOGIN_START:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
};