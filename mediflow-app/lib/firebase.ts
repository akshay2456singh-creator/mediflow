import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCm50OyLIAKadjG_6eLdQRW9RAHbJZR0VE",
  authDomain: "mediflow-d6357.firebaseapp.com",
  projectId: "mediflow-d6357",
  storageBucket: "mediflow-d6357.firebasestorage.app",
  messagingSenderId: "1090804376530",
  appId: "1:1090804376530:web:5fdf82efffa19789ec5e0b",
  measurementId: "G-6962VNEW1L"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);