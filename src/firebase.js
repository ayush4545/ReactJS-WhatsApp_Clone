import firebase from "firebase";
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD22PkZSNA3G9REd4kuMv1zqTqUczOu5ss",
  authDomain: "whatsappclone-812d5.firebaseapp.com",
  projectId: "whatsappclone-812d5",
  storageBucket: "whatsappclone-812d5.appspot.com",
  messagingSenderId: "1029025675969",
  appId: "1:1029025675969:web:2913eb5c5a6683677df240",
  measurementId: "G-PZ8NECGMB6"
};

  const firebaseApp=firebase.initializeApp(firebaseConfig)
  const db=firebaseApp.firestore();
  const auth=firebase.auth();
  const provider= new firebase.auth.GoogleAuthProvider();

  export {auth,provider};
  export default db;