import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../services/user.service';
import { FirestoreService } from '../services/firestore.service';

@Component({
  selector: 'app-note-edit',
  standalone: true,
  imports: [],
  templateUrl: './note-edit.component.html',
  styleUrl: './note-edit.component.css',
})
export class NoteEditComponent implements OnInit {
  noteId: any;
  userData: any;
  noteData?: any;
  constructor(
    private activatedRoute: ActivatedRoute,
    private _userService: UserService,
    private _firestoreService: FirestoreService
  ) {}

  async ngOnInit(): Promise<void> {
    this.noteId = this.activatedRoute.snapshot.paramMap.get('id');
    // this._userService.getUserData();
    // this.userData = this._userService.userData;
    // this.getNote();
  }

  async getNote(){
    const username = this.userData.username;
    this.noteData = await this._firestoreService.getNote(username, this.noteId)
  }
}
