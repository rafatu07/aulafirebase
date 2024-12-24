import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCxZ5wO47xPbFOAjfoBvJ5mn5FFNmSaf_w",
    authDomain: "aula-react-25cf3.firebaseapp.com",
    projectId: "aula-react-25cf3",
    storageBucket: "aula-react-25cf3.firebasestorage.app",
    messagingSenderId: "440557489627",
    appId: "1:440557489627:web:2818252041384e9afdebfe"
  };

  const firebaseApp = initializeApp(firebaseConfig);
  const db = getFirestore(firebaseApp);
  const auth = getAuth(firebaseApp);

  export {db, auth};