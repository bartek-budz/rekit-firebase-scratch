import {
  FIREBASE_API_KEY,
  FIREBASE_AUTH_DOMAIN,
  FIREBASE_DATABASE_URL,
  FIREBASE_PROJECT_ID,
  FIREBASE_STORAGE_BUCKET,
  FIREBASE_MESSAGE_SENDER_ID,
  FIREBASE_APP_ID
} from './env.js';

// core Firebase SDK must be listed before other Firebase SDKs
var firebase = require("firebase/app");
// add the Firebase products that you want to use
require("firebase/auth");

let firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: FIREBASE_AUTH_DOMAIN,
  databaseURL: FIREBASE_DATABASE_URL,
  projectId: FIREBASE_PROJECT_ID,
  storageBucket: FIREBASE_STORAGE_BUCKET,
  messagingSenderId: FIREBASE_MESSAGE_SENDER_ID,
  appId: FIREBASE_APP_ID
}

export const Firebase = firebase.initializeApp(firebaseConfig)

export function getAuthPersistence(remember) {
  return remember ? firebase.auth.Auth.Persistence.LOCAL : firebase.auth.Auth.Persistence.SESSION
}

export function addAuthStateListener(listener) {
  firebase.auth().onAuthStateChanged(listener)
}