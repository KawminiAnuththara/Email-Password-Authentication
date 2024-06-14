// firebase config key setup

// compat packages are API compatible with namespaced code
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

//your web app's firebase configuration

const firebaseConfig={
  apiKey: "AIzaSyA84cO_q5TuKkgRAdB8pAhy5jmkxXg5oMQ",
  authDomain: "auth-1070b.firebaseapp.com",
  projectId: "auth-1070b",
  storageBucket: "auth-1070b.appspot.com",
  messagingSenderId: "315063743738",
  appId: "1:315063743738:web:9e8b8cbf9561fe2d210543",
  measurementId: "G-KTY1XG0XC7"
};

if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
}

export {firebase};