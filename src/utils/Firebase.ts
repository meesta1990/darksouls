import { initializeApp } from 'firebase/app';
import { getDatabase } from "firebase/database";
import { getAuth  } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAf3sLYOTGro9gPHbG78u70-5xjKoY1t3w",
    authDomain: "darksouls-a4088.firebaseapp.com",
    databaseURL: "https://darksouls-a4088-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "darksouls-a4088",
    storageBucket: "darksouls-a4088.appspot.com",
    messagingSenderId: "138020481212",
    appId: "1:138020481212:web:a93773c2c561a195e408b9",
    measurementId: "G-4ZL0PXVHP3"
};

const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
export const auth = getAuth(app);
