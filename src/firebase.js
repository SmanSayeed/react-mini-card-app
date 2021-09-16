import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/database';

const config = {
    apiKey: "AIzaSyCVBEkKe8s0R2PvJhcgcBpgfXAy-KCv_Mk",
    authDomain: "note-9c9a9.firebaseapp.com",
    projectId: "note-9c9a9",
    storageBucket: "note-9c9a9.appspot.com",
    messagingSenderId: "969324045432",
    appId: "1:969324045432:web:13743ac69c21156c5e798d"
  };
const firedb = firebase.initializeApp(config);

const auth = firebase.auth();
const db = firebase.firestore();
const rdb = firedb.database().ref();

// export default firebase;
export {auth,db,rdb};