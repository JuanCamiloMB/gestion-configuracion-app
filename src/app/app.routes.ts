import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { NoteListComponent } from './note-list/note-list.component';
import { NoteEditComponent } from './note-edit/note-edit.component';
import { authguardGuard } from './authguard.guard';


export const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'signup',
    component: SignupComponent,
  },
  {
    path: 'notelist',
    component: NoteListComponent,
    canActivate:[authguardGuard]
  },
  {
    path: 'noteedit',
    component: NoteEditComponent,
    canActivate: [authguardGuard]
  },
];
