import {
  CONTACTS_LOAD_START,
  CONTACTS_LOAD_FAIL,
  CONTACTS_LOAD_SUCCESS,
  CONTACTS_LOAD,
  CONTACTS_CREATE_START,
  CONTACTS_CREATE_SUCCESS,
  CONTACTS_CREATE_FAIL,
  CONTACTS_DELETE_SUCCESS,
  CONTACTS_DELETE_FAIL,
  CONTACTS_DELETE_START
} from "../actions/ContactsAction";
import { Action } from "../models";

const INITIAL_STATE = {
  loading: false,
  error: undefined,
  contacts: undefined
};

export default (state: any = INITIAL_STATE, action: Action) => {
  switch (action.type) {
    case CONTACTS_LOAD_START:
      return {
        ...state,
        loading: true,
        error: undefined,
        contacts: undefined
      };
    case CONTACTS_CREATE_START:
    case CONTACTS_DELETE_START:
      return {
        ...state,
        loading: true,
        error: undefined
      };
    case CONTACTS_LOAD_FAIL:
    case CONTACTS_CREATE_FAIL:
    case CONTACTS_DELETE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case CONTACTS_CREATE_SUCCESS:
    case CONTACTS_LOAD_SUCCESS:
    case CONTACTS_DELETE_SUCCESS:
      return {
        ...state,
        loading: false
      }
    case CONTACTS_LOAD:
      return {
        ...state,
        contacts: action.payload
      };
    default:
      return state;
  }
};