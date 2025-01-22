import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core'; 
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';

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

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
  ]
};
