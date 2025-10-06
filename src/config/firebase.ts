import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBmgaVU7bbf0jfC2rnVw5aBImxJrbqdzUw",
  authDomain: "janowskicom-751a8.firebaseapp.com",
  projectId: "janowskicom-751a8",
  storageBucket: "janowskicom-751a8.firebasestorage.app",
  messagingSenderId: "385591074329",
  appId: "1:385591074329:web:8911bed68c31d565051488",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export default app;
