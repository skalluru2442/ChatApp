import { Injectable, inject } from '@angular/core';
import { Firestore, collection, addDoc, getDoc, doc, setDoc } from '@angular/fire/firestore';
import { onSnapshot } from 'firebase/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private firestore = inject(Firestore);

  async sendMessage(chatId: string, message: { sender: string; text: string }) {
    const messagesRef = collection(this.firestore, `chats/${chatId}/messages`);
    await addDoc(messagesRef, { ...message, createdAt: new Date() });
  }

  getMessages(chatId: string): Observable<any[]> {
    const messagesRef = collection(this.firestore, `chats/${chatId}/messages`);
    return new Observable(observer => {
      const unsubscribe = onSnapshot(messagesRef, snapshot => {
        const messages = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        observer.next(messages);
      });
      return () => unsubscribe();
    });
  }

  async verifyChatId(chatId: string): Promise<boolean> {
    const chatRef = doc(this.firestore, `chats/${chatId}`);
    const chatDoc = await getDoc(chatRef);
    return chatDoc.exists();
  }

  async createNewChat(userId1: string, userId2: string): Promise<void> {
    const chatId = [userId1, userId2].sort().join('_');
    const chatExists = await this.verifyChatId(chatId);
    if (!chatExists) {
      const chatRef = doc(this.firestore, `chats/${chatId}`);
      await setDoc(chatRef, { userIds: [userId1, userId2], createdAt: new Date() });
      console.log('New chat created:', chatId);
    } else {
      console.log('Chat already exists:', chatId);
    }
  }
}
