import firebase from "firebase/app";
import Contact from "../models/Contact";

const getCollection = (userId: string) => firebase.firestore().collection('contacts').doc(userId).collection('contacts');

export const CONTACTS_LOAD_START = 'CONTACTS_LOAD_START';
export const CONTACTS_LOAD_SUCCESS = 'CONTACTS_LOAD_SUCCESS';
export const CONTACTS_LOAD_FAIL = 'CONTACTS_LOAD_FAIL';
export const CONTACTS_LOAD = 'CONTACTS_LOAD';

export const contactsLoad = (userId: string) => async (dispatch: Function) => {
  dispatch({ type: CONTACTS_LOAD_START });

  try {
    const collection = await getCollection(userId);
    collection.onSnapshot(snapshot => {
      dispatch({ type: CONTACTS_LOAD, payload: snapshot.docs.map(item => item.data()) })
    });

    dispatch({ type: CONTACTS_LOAD_SUCCESS });
  } catch (err) {
    dispatch({ type: CONTACTS_LOAD_FAIL, payload: err.message });
  }
};

export const CONTACTS_CREATE_START = 'CONTACTS_CREATE_START';
export const CONTACTS_CREATE_SUCCESS = 'CONTACTS_CREATE_SUCCESS';
export const CONTACTS_CREATE_FAIL = 'CONTACTS_CREATE_FAIL';

export const contactCreate = (userId: string, contact: Contact) => async (dispatch: Function) => {
  dispatch({ type: CONTACTS_CREATE_START });

  try {
    await getCollection(userId).add(contact);

    dispatch({ type: CONTACTS_CREATE_SUCCESS });
  } catch (err) {
    dispatch({ type: CONTACTS_CREATE_FAIL, payload: err.message });
  }
};
