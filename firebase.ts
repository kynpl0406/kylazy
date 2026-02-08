import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// Configuration provided by the user
const firebaseConfig = {
  apiKey: "AIzaSyBIumF2fvv7SiaG0PskvPt2UWXF2ynRDKU",
  databaseURL: "https://esp-nqh-default-rtdb.europe-west1.firebasedatabase.app/"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Realtime Database and export it
export const database = getDatabase(app);