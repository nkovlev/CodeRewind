import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCjxVrWBjo6ysW1pHuzqc937OFC7jURZc4",
    authDomain: "coderewind-75799.firebaseapp.com",
    projectId: "coderewind-75799",
    storageBucket: "coderewind-75799.firebasestorage.app",
    messagingSenderId: "8678909216",
    appId: "1:8678909216:web:736f748a355f81330ba345",
    measurementId: "G-2N40B7PG8L"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);