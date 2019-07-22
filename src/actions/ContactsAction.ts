import firebase from "firebase";

export const CONTACTS_LOAD_START = 'CONTACTS_LOAD_START';
export const CONTACTS_LOAD_SUCCESS = 'CONTACTS_LOAD_SUCCESS';
export const CONTACTS_LOAD_FAIL = 'CONTACTS_LOAD_FAIL';
export const CONTACTS_LOAD = 'CONTACTS_LOAD';

export const contactsLoad = (userId: string) => async (dispatch: Function) => {
  dispatch({ type: CONTACTS_LOAD_START });

  try {
    const collection = await firebase.firestore().collection('contacts').doc().collection(userId);
    collection.onSnapshot(snapshot => {
      dispatch({ type: CONTACTS_LOAD, payload: snapshot.docs })
    });

    dispatch({ type: CONTACTS_LOAD_SUCCESS });
  } catch (err) {
    dispatch({ type: CONTACTS_LOAD_FAIL, payload: err.message });
  }
};
