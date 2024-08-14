import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"; // Add this line

const firebaseConfig = {
  apiKey: "AIzaSyC63a1J7DR1N5HvoZaptdqpF3ukEB1OZOQ",
  authDomain: "first-app-5656.firebaseapp.com",
  projectId: "first-app-5656",
  storageBucket: "first-app-5656.appspot.com",
  messagingSenderId: "586120957858",
  appId: "1:586120957858:web:54f057866c32681fe7acfb",
  measurementId: "G-3V76MY720Z",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app); // Add this line

export { firestore, auth, storage }; // Add storage to the export
