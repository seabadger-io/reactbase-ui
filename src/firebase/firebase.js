/* eslint no-console: "off" */
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/functions';
import config from './config';

firebase.initializeApp(config);

const auth = firebase.auth();
const providers = {
  google: new firebase.auth.GoogleAuthProvider(),
};
const db = firebase.firestore();
db.settings({
  timestampsInSnapshots: true,
});
db.enablePersistence()
  .catch((err) => {
    console.error('Disabled offline access, Error: ', err.code);
  });
const functions = firebase.functions();

export {
  auth,
  db,
  providers,
  functions,
};

export default firebase;
