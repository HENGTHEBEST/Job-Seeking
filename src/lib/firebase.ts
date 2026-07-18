import { initializeApp } from 'firebase/app';
import { initializeFirestore, getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCvdTMidevUl7h0TsggpzwlYJ6x8wlCElc",
  authDomain: "cedar-cogency-bk8sk.firebaseapp.com",
  projectId: "cedar-cogency-bk8sk",
  storageBucket: "cedar-cogency-bk8sk.firebasestorage.app",
  messagingSenderId: "849062920",
  appId: "1:849062920:web:bc02511fed100d5ea7b5bd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore with custom databaseId if specified
const db = initializeFirestore(app, {
  experimentalAutoDetectLongPolling: true, // helps with proxy/iframe environments
}, "ai-studio-673c4bf9-a949-488e-9562-0b0b9bddc312");

export { db };
