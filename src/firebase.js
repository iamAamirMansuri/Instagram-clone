import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyAhETNNcyrhJMl9LpRSxfin4WRHKP5-uz4",
  authDomain: "instagram-clone-54bb3.firebaseapp.com",
  projectId: "instagram-clone-54bb3",
  storageBucket: "instagram-clone-54bb3.appspot.com",
  messagingSenderId: "160352292289",
  appId: "1:160352292289:web:a70f8886cb7fd77dbcf340",
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };
