// import firebase from 'firebase/app';
// import "firebase/firebase-storage"
// import 'firebase/auth';
// import { firebaseConfig } from '../config';
import { initializeApp, getApp, getApps } from "firebase/app"

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_APIKEY,
    appId: process.env.NEXT_PUBLIC_APPID,
    messagingSenderId: process.env.NEXT_PUBLIC_MESSAGINGSENDERID,
    projectId: process.env.NEXT_PUBLIC_PROJECTID,
    authDomain: process.env.NEXT_PUBLIC_AUTHDOMAIN,
    storageBucket: process.env.NEXT_PUBLIC_STORAGEBUCKET,
};

const firebase = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);
export default firebase;
