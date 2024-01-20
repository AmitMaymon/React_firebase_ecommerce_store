import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA29aDf0VghF-Jf7WnG6fOgDEZmV5NSZ6w",
  authDomain: "react-project-25086.firebaseapp.com",
  projectId: "react-project-25086",
  storageBucket: "react-project-25086.appspot.com",
  messagingSenderId: "216556353406",
  appId: "1:216556353406:web:6231041e4ff15a75c2e52f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
const auth = getAuth(app)
export {db,auth}
