import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyA8nFK1-40fHSCDXfUNpIoRpPU4_TeVDhI",
  authDomain: "capacitordeploymentpoc.firebaseapp.com",
  databaseURL: "https://capacitordeploymentpoc-default-rtdb.firebaseio.com",
  projectId: "capacitordeploymentpoc",
  storageBucket: "capacitordeploymentpoc.firebasestorage.app",
  messagingSenderId: "619858086299",
  appId: "1:619858086299:web:022d63869514b6e139b93e",
  measurementId: "G-0L7KKXMDT4"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const firestore = getFirestore(app);