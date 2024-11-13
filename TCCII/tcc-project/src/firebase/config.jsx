import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from  "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyAeRn6PVrKSHqHoNNqQM5vbRyQo8sT1IpU",
  authDomain: "importacao-e5b39.firebaseapp.com",
  projectId: "importacao-e5b39",
  storageBucket: "importacao-e5b39.firebasestorage.app",
  messagingSenderId: "395580008177",
  appId: "1:395580008177:web:9d7d28f1a041b7b5dbeb50",
  measurementId: "G-XNEZ92MLJT"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export { db };