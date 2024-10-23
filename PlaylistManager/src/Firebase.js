import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAGeX8Agcd1EGlvGdlFzHsE2zMdYIz7JDY",
  authDomain: "blaash-6e0ef.firebaseapp.com",
  projectId: "blaash-6e0ef",
  storageBucket: "blaash-6e0ef.appspot.com",
  messagingSenderId: "346825101602",
  appId: "1:346825101602:web:aae634bbee34c8197b557b",
  measurementId: "G-CL9FSSSGQF",
  databaseURL: "https://blaash-6e0ef-default-rtdb.firebaseio.com/",
};

export const app = initializeApp(firebaseConfig);
