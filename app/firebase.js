import * as firebase from 'firebase';
import {
  GOOGLE_APIKEY,
  FIREBASE_AUTHDOMAIN,
  FIREBASE_PROJECTID,
  FIREBASE_STORAGEBUCKET,
  FIREBASE_MESSINGSENDERID,
  FIREBASE_APPID,
  FIREBASE_MEASUREMENTID,
} from '@env';

const firebaseConfig = {
  apiKey: GOOGLE_APIKEY,
  authDomain: FIREBASE_AUTHDOMAIN,
  projectId: FIREBASE_PROJECTID,
  storageBucket: FIREBASE_STORAGEBUCKET,
  messagingSenderId: FIREBASE_MESSINGSENDERID,
  appId: FIREBASE_APPID,
  measurementId: FIREBASE_MEASUREMENTID,
};

let app; //redid this initializing code
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

export const auth = firebase.auth();

export { firebase };
