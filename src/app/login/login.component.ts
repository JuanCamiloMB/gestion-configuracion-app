import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginForm = new FormGroup({
    passwordControl: new FormControl(''),
    emailControl: new FormControl(''),
  });
  constructor(private userService: UserService){}

  async signIn(email: string, password: string) {
    const user = await this.userService.signIn(email, password);
    console.log(user)
  }

  async onSubmit() {
    const { emailControl: email, passwordControl: password } =
      this.loginForm.value;
    if (email && password) {
      const user = await this.signIn(email, password);
    } else {
      console.error('Por favor ingrese todos los datos');
    }
  }
}
