import { LOGIN_START, LOGIN_FAILED, LOGIN_SUCCESS, LOGOUT } from "../actions/AuthAction";

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
        loading: true,
        error: undefined
      };
    case LOGIN_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload
      }
    case LOGOUT:
      return { ...INITIAL_STATE };
    default:
      return state;
  }
};