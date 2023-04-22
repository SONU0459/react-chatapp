 
import { initializeApp } from "firebase/app";
import App from "./App";
 
const firebaseConfig = {
  apiKey: "AIzaSyBHzvCcTrT1vBrYOPrfhVA5MYTTP9vLzQo",
  authDomain: "reactchatapp-c5bb0.firebaseapp.com",
  projectId: "reactchatapp-c5bb0",
  storageBucket: "reactchatapp-c5bb0.appspot.com",
  messagingSenderId: "777664401266",
  appId: "1:777664401266:web:7282fb5eeef449bbc357eb"
};

const app = initializeApp(firebaseConfig);

export  default app;

 