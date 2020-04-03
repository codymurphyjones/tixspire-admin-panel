import config from "../config"

import * as firebase from "firebase/app";
// Add the Firebase services that you want to use
import "firebase/firestore";
import "firebase/storage"
import "firebase/auth"

if (!firebase.apps.length)
	firebase.initializeApp(config.firebaseConfig);
// Initialize Firebase
const storage = firebase.storage();
const firestore = firebase.firestore();
const auth = firebase.auth()

export {
	firebase,
	storage,
	firestore,
	auth
}