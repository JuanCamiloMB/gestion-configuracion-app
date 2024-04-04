import { Injectable, WritableSignal, signal } from '@angular/core';
import {
  Auth,
  UserCredential,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public isLoggedIn: Subject<boolean> = new Subject<boolean>()
  constructor(private _auth: Auth, private router:Router) {}
  async signUp(email: string, password: string): Promise<UserCredential> {
    const userCredentials = await createUserWithEmailAndPassword(this._auth, email, password);
    this.isLoggedIn.next(true)
    this.router.navigate(['/notelist'])
    return userCredentials
  }

  async signIn(email: string, password: string) {
    try {
      const userCredential: UserCredential = await signInWithEmailAndPassword(
        this._auth,
        email,
        password
      );
      const user = userCredential.user;
      this.isLoggedIn.next(true)
      this.router.navigate(['/notelist'])
      return user;
    } catch (err) {
      console.error('Error login ', err);
      return;
    }
  }

  async getCurrentUser(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const unsubscribe = onAuthStateChanged(
        this._auth,
        (user) => {
          unsubscribe();
          if (user) {
            this.isLoggedIn.next(true)
            resolve(true);
          } else {
            this.isLoggedIn.next(false)
            resolve(false);
          }
        },
        reject
      );
    });
  }

  async signOut(): Promise<boolean> {
    try {
      await signOut(this._auth);
      this.isLoggedIn.next(false)
      this.router.navigate(['/'])
      return true;
    } catch (err) {
      console.error('Error signing out ', err);
      return false;
    }
  }
}
