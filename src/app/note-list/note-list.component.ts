import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../services/user.service';
import { FirestoreService } from '../services/firestore.service';

@Component({
  selector: 'app-note-list',
  standalone: true,
  imports: [],
  templateUrl: './note-list.component.html',
  styleUrl: './note-list.component.css',
})
export class NoteListComponent {
  noteList: any;
  userData: any;
  constructor(
    private activatedRoute: ActivatedRoute,
    private _userService: UserService,
    private _firestoreService: FirestoreService
  ) {
    this._userService.getUserData();
    this.userData = this._userService.userData;
  }

  getNotes() {
    const username = this.userData.username;
    this.noteList = this._firestoreService.getNotes(username);
  }
}
