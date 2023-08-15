
import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyBGiTZWwW4qRMbjSAM3HcH4yJI5MFn6ems",
  authDomain: "funroom-5f2e4.firebaseapp.com",
  projectId: "funroom-5f2e4",
  storageBucket: "funroom-5f2e4.appspot.com",
  messagingSenderId: "222803359739",
  appId: "1:222803359739:web:0a3fe183ce41303137bd5e"
};

const app = initializeApp(firebaseConfig);
export const auth=getAuth(app)  // for authentication
export const provider=new GoogleAuthProvider();  //for google signUp
export const db=new getFirestore(app);    //for firebase storage