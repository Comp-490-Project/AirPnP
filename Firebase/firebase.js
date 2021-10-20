import * as firebase from 'firebase';

const firebaseConfig = {
  //apiKey: 'AIzaSyCPKNOoCCeaB6DY2UOQ_KTPVyoJfsJAPZ4',
  apiKey: 'AIzaSyDOeEKbcngBARFdVV8a5K75fakxbrS3Kro',
  authDomain: 'airpnp-327419.firebaseapp.com',
  projectId: 'airpnp-327419',
  storageBucket: 'airpnp-327419.appspot.com',
  messagingSenderId: '138637806118',
  appId: '1:138637806118:web:4ff5512c5bd7acf14234e7',
  measurementId: 'G-RNLPTZ7F2C',
};

let app; //redid this initializing code
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

export const auth = firebase.auth();

export { firebase };
