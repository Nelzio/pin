import * as firebase from 'firebase/app'

import "firebase/auth";
import "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyAX5Uog-5hAYc8Aa26OkgnlTRrsG3R6niQ",
    authDomain: "hackathon-d2-1aa62.firebaseapp.com",
    databaseURL: "https://hackathon-d2-1aa62.firebaseio.com",
    projectId: "hackathon-d2-1aa62",
    storageBucket: "hackathon-d2-1aa62.appspot.com",
    messagingSenderId: "12994905891",
    appId: "1:12994905891:web:2330f7c983045b3be76e96"
};

let firebaseApp = firebase.initializeApp(firebaseConfig)

let firebaseAuth = firebaseApp.auth()
let firebaseDb = firebaseApp.database()

export { firebaseAuth, firebaseDb }