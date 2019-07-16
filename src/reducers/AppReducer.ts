import { APP_LOADED } from "../actions/AppAction";

const INITIAL_STATE = {
  isAppLoaded: false
};

export default (state: any = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case APP_LOADED:
      return {
        ...state,
        isAppLoaded: true
      };
    default:
      return state;
  }
};