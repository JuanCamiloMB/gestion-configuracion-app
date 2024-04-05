import { Injectable } from '@angular/core';
import {
  DocumentData,
  Firestore,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from '@angular/fire/firestore';
import { Note } from '../models/notes.model';
import { User } from '@angular/fire/auth';


@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  constructor(private _firestore: Firestore) {}
  async createUserFolder(username: string, email:string) {
    try {
      await setDoc(doc(this._firestore, 'users', `${username}`), {
        username: username,
        email: email
      });
      return true;
    } catch (err) {
      console.error('Error adding to firestore ', err);
      return;
    }
  }

  async getUserByEmail(email:string){
    try{
      const usersRef = collection(this._firestore, 'users');
      const q = query(usersRef, where('email', '==', email));
      const querySnapshot = await getDocs(q);
      let user!:DocumentData;
      querySnapshot.forEach((doc)=>{
        console.log(doc.data())
        user = doc.data()
      }
      )
      // console.log(user)
      return user;
    }catch(err){
      console.error('Error fetching by email ',err)
      return
    }
  }

  async createNote(username: string, note: Note) {
    try {
      const notesRef = collection(
        this._firestore,
        'users',
        `${username}`,
        'notes'
      );
      const docRef = await addDoc(notesRef, note); //docRef.id
      console.log('Document written with ID: ', docRef.id);
      return docRef.id
    } catch (err) {
      console.error('Error adding document ', err);
      return
    }
  }

  async updateNote(username: string, note: Note) {
    console.log(note)
    try {
      const docRef = doc(
        this._firestore,
        'users',
        `${username}`,
        'notes',
        `${note.id}`
      );
      await updateDoc(docRef, { ...note });
      console.log('Note updated');
    } catch (err) {
      console.error('Error upadting note ', err);
    }
  }

  async getNotes(username: string) {
    try {
      let notes: Note[] = [];
      const querySnapshot = await getDocs(
        collection(this._firestore, 'users', `${username}`, 'notes')
      );
      querySnapshot.forEach((doc) => {
        notes.push({
          id: doc.id,
          title: doc.data()['title'],
          content: doc.data()['content'],
        });
      });
      return notes;
    } catch (err) {
      console.error('Error retrieving notes ', err);
      return;
    }
  }

  async getNote(username: string, noteId: string) {
    try {
      const docRef = doc(
        this._firestore,
        'users',
        `${username}`,
        'notes',
        `${noteId}`
      );
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return docSnap.data();
      } else {
        console.log('No such document');
        return;
      }
    } catch (err) {
      console.error('Error retrieving note ', err);
      return;
    }
  }

  async deleteNote(username: string, noteId: string){
    try{
      await deleteDoc(doc(this._firestore, 'users', `${username}`, 'notes', `${noteId}`))
    }catch(err){
      console.error('Error deleting note ', err)
    }
  }
}
