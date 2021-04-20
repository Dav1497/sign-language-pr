import firebase from "firebase/app";
import "firebase/storage"

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDqMa6MIezqT5_kxJMNvRk7fhggsIEQxWc",
    authDomain: "sign-language-pr.firebaseapp.com",
    projectId: "sign-language-pr",
    storageBucket: "sign-language-pr.appspot.com",
    messagingSenderId: "1073286434292",
    appId: "1:1073286434292:web:7e8488dc55ccba1acebda1",
    measurementId: "G-858SSY7HRN"
  };

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export {storage, firebase as default}