import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyD7I6dpBqrJI2CsV3N7KPwdABd3qhkL0DM",
    authDomain: "taxi-app-77a76.firebaseapp.com",
    databaseURL: "https://taxi-app-77a76.firebaseio.com",
    projectId: "taxi-app-77a76",
    storageBucket: "taxi-app-77a76.appspot.com",
    messagingSenderId: "92201142179",
    appId: "1:92201142179:web:20bfd9cab8f5d8f196bc16"
};

export const fire = firebase;
firebase.initializeApp(firebaseConfig);
