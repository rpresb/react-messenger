import { REGISTER_START, REGISTER_SUCCESS, REGISTER_FAILED } from "../actions/RegisterAction";

const INITIAL_STATE = {
  loading: false,
  error: undefined
};

export default (state: any = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case REGISTER_START:
      return {
        ...state,
        loading: true,
        error: undefined
      };
    case REGISTER_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        loading: false
      }
    default:
      return state;
  }
};