import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCL-3FZrYhZ2r99uTyNntv5QDh727Uo6BE",
  authDomain: "fir-tester-2-a35a7.firebaseapp.com",
  projectId: "fir-tester-2-a35a7",
  storageBucket: "fir-tester-2-a35a7.appspot.com",
  messagingSenderId: "190190509707",
  appId: "1:190190509707:web:48b7ab4d66d85ad22f7e8e",
  measurementId: "G-3XJPB43ND1",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore();
