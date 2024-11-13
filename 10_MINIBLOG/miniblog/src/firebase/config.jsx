import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from  "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBNkHAINOlLJ6TJoTqVUSM4f7tbFpcbX1M",
  authDomain: "miniblog-96b0f.firebaseapp.com",
  projectId: "miniblog-96b0f",
  storageBucket: "miniblog-96b0f.firebasestorage.app",
  messagingSenderId: "227613416537",
  appId: "1:227613416537:web:a7d9f1675c30d66fab6548",
  measurementId: "G-H6GS9CW65T"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };