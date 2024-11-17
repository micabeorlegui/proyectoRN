import app from "firebase/app"
import firebase from "firebase"

const firebaseConfig = {
    apiKey: "AIzaSyBqjmiBrTE2pIUo8eBvqdIkAKSi7IF_reI",
    authDomain: "proyectorn-f2f2d.firebaseapp.com",
    projectId: "proyectorn-f2f2d",
    storageBucket: "proyectorn-f2f2d.firebasestorage.app",
    messagingSenderId: "81786374945",
    appId: "1:81786374945:web:2301cf6f7388571d260c60"
};

app.initializeApp(firebaseConfig)

export const storage = app.storage()
export const db= app.firestore()
export const auth= firebase.auth()