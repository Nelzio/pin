import * as firebase from 'firebase/app'
import firestore from 'firebase/firestore'
import storage from 'firebase/storage'

import "firebase/auth";
import "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyCw9ow5P77vpoV6yMB_ZcuFhf_f13BL8mM",
    authDomain: "hack-a2a7b.firebaseapp.com",
    databaseURL: "https://hack-a2a7b.firebaseio.com",
    projectId: "hack-a2a7b",
    storageBucket: "gs://hack-a2a7b.appspot.com",
    messagingSenderId: "147221850544",
    appId: "1:147221850544:web:c9c96cfe62f0665df28e75",
};
// storageBucket: "hack-a2a7b.appspot.com",

const settings = {timestampsInSnapshots: true}; // firebase

// let firebaseApp = firebase.initializeApp(firebaseConfig)

// let firebaseDb = firebaseApp.database()

// firestoreDb.settings(settings)

firebase.initializeApp(firebaseConfig);

// firebase.firestore().settings(settings);

let firebaseAuth = firebase.auth()
let firestoreDb = firebase.firestore()
let fireStorage = firebase.storage();

// export default firebase;


export { firebaseAuth, firestoreDb, firebase, fireStorage }