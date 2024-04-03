import { Injectable } from '@angular/core';
import {
  Auth,
  UserCredential,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private _auth: Auth) {}
  async signUp(email: string, password: string): Promise<UserCredential> {
    return await createUserWithEmailAndPassword(this._auth, email, password);
  }

  async signIn(email: string, password:string){
    try {
      const userCredential: UserCredential = await signInWithEmailAndPassword(
        this._auth,
        email,
        password
      );
      const user = userCredential.user;
      // console.log(user);
      return user;
    } catch (err) {
      console.error('Error login ', err);
      return;
    }
  }

  async getCurrentUser():Promise<boolean> {
    return new Promise((resolve, reject) => {
      const unsubscribe = onAuthStateChanged(this._auth, (user) => {
        unsubscribe();
        if(user){
          resolve(true)
        }else{
          resolve(false)
        }
      },reject);
    });

    // onAuthStateChanged(this._auth, (user) => {
    //   if (user) {
    //     // User is signed in, see docs for a list of available properties
    //     // https://firebase.google.com/docs/reference/js/auth.user
    //     const uid = user.uid;
    //     console.log('here');
    //     return true;
    //     // ...
    //   } else {
    //     // User is signed out
    //     // ...
    //     return false;
    //   }
    // });
  }
}
