import * as firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyCPKNOoCCeaB6DY2UOQ_KTPVyoJfsJAPZ4",
    authDomain: "airpnp-92187.firebaseapp.com",
    projectId: "airpnp-92187",
    storageBucket: "airpnp-92187.appspot.com",
    messagingSenderId: "138637806118",
    appId: "1:138637806118:web:4ff5512c5bd7acf14234e7",
    measurementId: "G-RNLPTZ7F2C"
  }

if(!firebase.apps.length){ // Check if app has been initialized already
    firebase.initializeApp(firebaseConfig);
}

export {firebase} // Import when database required. 

