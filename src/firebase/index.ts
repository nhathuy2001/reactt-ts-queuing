
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {

    apiKey: "AIzaSyBy9IT0lqU9EJFv-Oy-Ur1ZAuwFwTcT3U4",
    authDomain: "speedy-crawler-362510.firebaseapp.com",
    projectId: "speedy-crawler-362510",
    storageBucket: "speedy-crawler-362510.appspot.com",
    messagingSenderId: "722329512455",
    appId: "1:722329512455:web:793c35a8982bb9fd4ed8a2",
    measurementId: "G-XKVG3ZQD3Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
