import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB1fsFmUmcr7a-rrRHA2sEpXLny1dpPaDc",
  authDomain: "learnx-36ad2.firebaseapp.com",
  projectId: "learnx-36ad2",
  storageBucket: "learnx-36ad2.firebasestorage.app",
  messagingSenderId: "185659366535",
  appId: "1:185659366535:web:9694dca5b6999737196c22"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;