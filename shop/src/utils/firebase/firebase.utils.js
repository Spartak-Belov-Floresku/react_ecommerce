import { initializeApp } from "firebase/app";
import {
    getAuth,
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider
} from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyAfnM-J6LffAPsRNwVkiqBAkQhJnLsQMfU",
  authDomain: "shop-db-e6100.firebaseapp.com",
  projectId: "shop-db-e6100",
  storageBucket: "shop-db-e6100.appspot.com",
  messagingSenderId: "419047344333",
  appId: "1:419047344333:web:0088c5b76228a01a970184"
};


// Initialize Firebase

const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);