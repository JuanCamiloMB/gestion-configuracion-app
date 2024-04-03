import { Component } from '@angular/core';

import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { doc, getFirestore, setDoc } from '@angular/fire/firestore';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  signUpForm = new FormGroup({
    passwordControl: new FormControl(''),
    usernameControl: new FormControl(''),
    emailControl: new FormControl(''),
  });

  constructor(private _userService: UserService) {}

  async SignUp(email: string, password: string) {
    try {
      return this._userService
        .signUp(email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          return user;
        });
    } catch (err) {
      console.error('Error signing up ', err);
      return false;
    }
  }

  async addToFirestore(username: string, email: string) {
    try {
      const db = getFirestore();
      const userRef = doc(db, 'users', `${username}`);
      await setDoc(userRef, {
        email: email,
        username: username,
      });
    } catch (err) {
      console.error('Error inserting to firestore ', err);
    }
  }
  async onSubmit() {
    const {
      emailControl: email,
      usernameControl: username,
      passwordControl: password,
    } = this.signUpForm.value;
    if (email && password && username) {
      const user = await this.SignUp(email, password);
      if (user) {
        await this.addToFirestore(username, email);
      }
    } else {
      console.error('Por favor ingrese todos los datos');
    }
  }
}
