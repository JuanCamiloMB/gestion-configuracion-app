import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../services/user.service';
import { FirestoreService } from '../services/firestore.service';
import { Router } from '@angular/router';
import { BannerComponent } from '../banner/banner.component';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, BannerComponent],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  signUpForm = new FormGroup({
    passwordControl: new FormControl(''),
    usernameControl: new FormControl(''),
    emailControl: new FormControl(''),
  });

  constructor(private _userService: UserService, private _firestoreService: FirestoreService, private router:Router) {}

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

  async onSubmit() {
    const {
      emailControl: email,
      usernameControl: username,
      passwordControl: password,
    } = this.signUpForm.value;
    if (email && password && username) {
      const user = await this.SignUp(email, password);
      let userCreated = await this._firestoreService.createUserFolder(username);
      if (user && userCreated) {
        console.log(`user ${user.email} registered`)
        this.router.navigate(['/notelist'])
      }
    } else {
      console.error('Por favor ingrese todos los datos');
    }
  }
}
