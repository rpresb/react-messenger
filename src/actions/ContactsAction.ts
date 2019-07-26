import firebase from "firebase/app";
import Contact from "../models/Contact";
import { getUsersCollection } from "./AuthAction";

const getContactsCollection = (userId: string) => firebase.firestore().collection('contacts').doc(userId).collection('contacts');

export const CONTACTS_LOAD_START = 'CONTACTS_LOAD_START';
export const CONTACTS_LOAD_SUCCESS = 'CONTACTS_LOAD_SUCCESS';
export const CONTACTS_LOAD_FAIL = 'CONTACTS_LOAD_FAIL';
export const CONTACTS_LOAD = 'CONTACTS_LOAD';

export const contactsLoad = (userId: string) => async (dispatch: Function) => {
  const refreshContactList = async (snapshot: firebase.firestore.QuerySnapshot) => {
    const contacts = snapshot.docs.map(item => ({ ...item.data() as Contact, id: item.id }));

    const userCollection = getUsersCollection();

    for (let i in contacts) {
      const user = await userCollection.where('email', '==', contacts[i].email).get();
      contacts[i].exists = !user.empty;
    }

    const sortedContacts = [...contacts].sort((a, b) => a.name.localeCompare(b.name));

    dispatch({ type: CONTACTS_LOAD, payload: sortedContacts });
  };

  dispatch({ type: CONTACTS_LOAD_START });

  try {
    const collection = await getContactsCollection(userId);
    const snapshot = await collection.get();
    if (snapshot.size > 0) {
      collection.onSnapshot(refreshContactList);
    } else {
      dispatch({ type: CONTACTS_LOAD, payload: [] });
    }

    dispatch({ type: CONTACTS_LOAD_SUCCESS });
  } catch (err) {
    dispatch({ type: CONTACTS_LOAD_FAIL, payload: err.message });
  }
};

export const CONTACTS_CREATE_START = 'CONTACTS_CREATE_START';
export const CONTACTS_CREATE_SUCCESS = 'CONTACTS_CREATE_SUCCESS';
export const CONTACTS_CREATE_FAIL = 'CONTACTS_CREATE_FAIL';

export const contactCreate = (userId: string, contact: Contact) => async (dispatch: Function, getState: Function) => {
  dispatch({ type: CONTACTS_CREATE_START });

  try {
    await getContactsCollection(userId).add(contact);

    const { contact: contactState } = getState();
    if (!contactState.contacts || !contactState.contacts.length) {
      await contactsLoad(userId)(dispatch);
    }

    dispatch({ type: CONTACTS_CREATE_SUCCESS });
  } catch (err) {
    dispatch({ type: CONTACTS_CREATE_FAIL, payload: err.message });
  }
};

export const CONTACTS_DELETE_START = 'CONTACTS_DELETE_START';
export const CONTACTS_DELETE_SUCCESS = 'CONTACTS_DELETE_SUCCESS';
export const CONTACTS_DELETE_FAIL = 'CONTACTS_DELETE_FAIL';

export const contactDelete = (userId: string, contactId: string) => async (dispatch: Function) => {
  dispatch({ type: CONTACTS_DELETE_START });

  try {
    const contactDoc = await getContactsCollection(userId).doc(contactId);
    await contactDoc.delete();
    dispatch({ type: CONTACTS_DELETE_SUCCESS });
  } catch (err) {
    dispatch({ type: CONTACTS_DELETE_FAIL, payload: err.message });
  }
};
