import firebase from "firebase/app";
import Contact from "../models/Contact";
import { getUsersCollection } from "./AuthAction";

const getContactsCollection = (userId: string) => firebase.firestore().collection('contacts').doc(userId).collection('contacts');

export const CONTACTS_LOAD_START = 'CONTACTS_LOAD_START';
export const CONTACTS_LOAD_SUCCESS = 'CONTACTS_LOAD_SUCCESS';
export const CONTACTS_LOAD_FAIL = 'CONTACTS_LOAD_FAIL';
export const CONTACTS_LOAD = 'CONTACTS_LOAD';

export const contactsLoad = (userId: string) => async (dispatch: Function) => {
  dispatch({ type: CONTACTS_LOAD_START });

  try {
    const collection = await getContactsCollection(userId);
    const snapshot = await collection.get();
    if (snapshot.size > 0) {
      const contacts = snapshot.docs.map(item => item.data());

      const userCollection = getUsersCollection();

      for (let i in contacts) {
        const user = await userCollection.where('email', '==', contacts[i].email).get();
        contacts[i].exists = !user.empty;
      }

      dispatch({ type: CONTACTS_LOAD, payload: contacts });
    }

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
    await getContactsCollection(userId).add(contact);
    await contactsLoad(userId)(dispatch);

    dispatch({ type: CONTACTS_CREATE_SUCCESS });
  } catch (err) {
    dispatch({ type: CONTACTS_CREATE_FAIL, payload: err.message });
  }
};
