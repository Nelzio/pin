import * as firebase from 'firebase/app'
import firestore from 'firebase/firestore'
import storage from 'firebase/storage'

import "firebase/auth";
import "firebase/database";

// const firebaseConfig = {
//     apiKey: "AIzaSyCw9ow5P77vpoV6yMB_ZcuFhf_f13BL8mM",
//     authDomain: "hack-a2a7b.firebaseapp.com",
//     databaseURL: "https://hack-a2a7b.firebaseio.com",
//     projectId: "hack-a2a7b",
//     storageBucket: "gs://hack-a2a7b.appspot.com",
//     messagingSenderId: "147221850544",
//     appId: "1:147221850544:web:c9c96cfe62f0665df28e75",
// };

const firebaseConfig = {
  apiKey: "AIzaSyDAHfnJHuKcTBc7x9VARFcoLH1xFbA1_uM",
  authDomain: "superactive-app.firebaseapp.com",
  databaseURL: "https://superactive-app.firebaseio.com",
  projectId: "superactive-app",
  storageBucket: "superactive-app.appspot.com",
  messagingSenderId: "199039594724",
  appId: "1:199039594724:web:15c0d946bbc3bfc5723cf1",
  measurementId: "G-XXBNZNEM7G"
};

// const firebaseConfig = {
//   apiKey: "AIzaSyCUJ3VMnJ_DMAzBPDi6I6L8DE9K2Qmgsy8",
//   authDomain: "superativo-app.firebaseapp.com",
//   databaseURL: "https://superativo-app.firebaseio.com",
//   projectId: "superativo-app",
//   storageBucket: "superativo-app.appspot.com",
//   messagingSenderId: "139804874788",
//   appId: "1:139804874788:web:f5aec21794149117dc60b1",
//   measurementId: "G-5LY0C0FBCV"
// };

// var firebaseConfig = {
//   apiKey: "AIzaSyDAHfnJHuKcTBc7x9VARFcoLH1xFbA1_uM",
//   authDomain: "superactive-app.firebaseapp.com",
//   databaseURL: "https://superactive-app.firebaseio.com",
//   projectId: "superactive-app",
//   storageBucket: "superactive-app.appspot.com",
//   messagingSenderId: "199039594724",
//   appId: "1:199039594724:web:9cb46d154c633d64723cf1",
//   measurementId: "G-9KVGP2TJ2P"
// };
// Initialize Firebase
// firebase.initializeApp(firebaseConfig);

const settings = {timestampsInSnapshots: true}; // firebase

// let firebaseApp = firebase.initializeApp(firebaseConfig)

// let firebaseDb = firebaseApp.database()

// firestoreDb.settings(settings)

firebase.initializeApp(firebaseConfig);
// firebase.analytics();

// firebase.firestore().settings(settings);

let firebaseAuth = firebase.auth()
let firestoreDb = firebase.firestore()
let fireStorage = firebase.storage();

// export default firebase;


export { firebaseAuth, firestoreDb, firebase, fireStorage }