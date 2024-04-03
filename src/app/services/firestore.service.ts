import { Injectable } from '@angular/core';
import { Firestore, doc, setDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  constructor(private _firestore: Firestore) {}
  async createUserFolder(username: string) {
    try {
      await setDoc(doc(this._firestore, 'users', `${username}`), {});
      return true
    } catch (err) {
      console.error('Error adding to firestore ', err);
      return
    }
  }
}
