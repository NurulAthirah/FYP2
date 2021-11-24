import * as firebase from 'firebase';

let config = {
  apiKey: "AIzaSyBjTmojUckNsYKCaO02-u2pRmCG2RrZsKA",
  authDomain: "loghelp-11f0e.firebaseapp.com",
  databaseURL: "https://loghelp-11f0e-default-rtdb.firebaseio.com",
  projectId: "loghelp-11f0e",
  storageBucket: "loghelp-11f0e.appspot.com",
  messagingSenderId: "501194854809",
  appId: "1:501194854809:web:770db80136824b79b78308",
  measurementId: "G-PX4WSFLRP1"
}

let app = firebase.initializeApp(config);
export const db = app.database();
