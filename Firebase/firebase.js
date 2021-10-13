import * as firebase from 'firebase';

const firebaseConfig = {
  //apiKey: 'AIzaSyCPKNOoCCeaB6DY2UOQ_KTPVyoJfsJAPZ4',
  apiKey: 'AIzaSyDOeEKbcngBARFdVV8a5K75fakxbrS3Kro',
  authDomain: 'airpnp-92187.firebaseapp.com',
  projectId: 'airpnp-92187',
  storageBucket: 'airpnp-92187.appspot.com',
  messagingSenderId: '138637806118',
  appId: '1:138637806118:web:4ff5512c5bd7acf14234e7',
  measurementId: 'G-RNLPTZ7F2C',
};

let app;//redid this initializing code
if(firebase.apps.length === 0){
  app = firebase.initializeApp(firebaseConfig);
} else{
  app = firebase.app()
}
const auth = firebase.auth()

export{ auth };