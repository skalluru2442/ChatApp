import { Injectable, inject, NgZone } from '@angular/core';
import { Firestore, collection, addDoc, getDocs, query } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private firestore = inject(Firestore);
  private ngZone = inject(NgZone); // Inject NgZone

  // To get users from Firestore
  getUsers(): Observable<any[]> {
    const usersRef = collection(this.firestore, 'users'); // Assuming a 'users' collection

    return new Observable(observer => {
      // Run the Firebase call inside Angular's zone
      this.ngZone.run(() => {
        getDocs(usersRef)
          .then(snapshot => {
            const users = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            observer.next(users);
            observer.complete();
          })
          .catch(error => {
            observer.error(error);
          });
      });
    });
  }

  // Function to add a new user if not already added
  async addUserIfNotExist(user: any) {
    const usersRef = collection(this.firestore, 'users');
    const q = query(usersRef);
    const snapshot = await getDocs(q);
    const existingUser = snapshot.docs.find(doc => doc.data()['email'] === user.email);

    if (!existingUser) {
      await addDoc(usersRef, user); // Add user if not found
    }
  }
}
