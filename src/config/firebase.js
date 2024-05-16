import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyCxPx5GpglaJfVBRHA2v2iqSegYfkCsk_A",
    authDomain: "login-for-hack.firebaseapp.com",
    databaseURL: "https://login-for-hack-default-rtdb.firebaseio.com",
    projectId: "login-for-hack",
    storageBucket: "login-for-hack.appspot.com",
    messagingSenderId: "569416934185",
    appId: "1:569416934185:web:4fe5735069098774330d38",
    measurementId: "G-2JHX7BHJ4P"
  };

firebase.initializeApp(firebaseConfig);

export default firebase;