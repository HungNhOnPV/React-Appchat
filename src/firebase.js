import firebase from 'firebase/app';
import "firebase/auth";
import "firebase/database";
import "firebase/storage";

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyCY68WAGdYd01HyiYTGvvnCyx6hO9hCOqc",
    authDomain: "react-slack-clone-826e9.firebaseapp.com",
    databaseURL: "https://react-slack-clone-826e9.firebaseio.com",
    projectId: "react-slack-clone-826e9",
    storageBucket: "react-slack-clone-826e9.appspot.com",
    messagingSenderId: "897365511289",
    appId: "1:897365511289:web:779a490146d7f9716098a8",
    measurementId: "G-CPHPSH54QB"
  };
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// firebase.analytics();

export default firebase;