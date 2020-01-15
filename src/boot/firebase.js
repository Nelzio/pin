import * as firebase from 'firebase/app'

import "firebase/auth";
import "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyCw9ow5P77vpoV6yMB_ZcuFhf_f13BL8mM",
    authDomain: "hack-a2a7b.firebaseapp.com",
    databaseURL: "https://hack-a2a7b.firebaseio.com",
    projectId: "hack-a2a7b",
    storageBucket: "hack-a2a7b.appspot.com",
    messagingSenderId: "147221850544",
    appId: "1:147221850544:web:c9c96cfe62f0665df28e75"
};

let firebaseApp = firebase.initializeApp(firebaseConfig)

let firebaseAuth = firebaseApp.auth()
let firebaseDb = firebaseApp.database()

export { firebaseAuth, firebaseDb }