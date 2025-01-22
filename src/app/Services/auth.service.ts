import { inject, Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, User } from '@angular/fire/auth';
import { UserService } from './user.service';
import { doc, Firestore, getDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userService = inject(UserService);
  auth = inject(Auth);
  firestore = inject(Firestore);

  getCurrentUser(): User | null {
    return this.auth.currentUser;
  }

  async register(email: string, password: string) {
    // return await createUserWithEmailAndPassword(this.auth, email, password);
    const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
    console.log(userCredential);
    // Add user to Firestore after registration
    const user = {
      email: email,
      id: userCredential.user.uid, // Firebase user ID
      createdAt: new Date(),
    };
    await this.userService.addUserIfNotExist(user);
  }

  async login(email: string, password: string) {
    return await signInWithEmailAndPassword(this.auth, email, password);
  }

  async logout() {
    return await signOut(this.auth);
  }
}