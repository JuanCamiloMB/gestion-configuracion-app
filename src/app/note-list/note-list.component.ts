import { Component } from '@angular/core';
import { ActivatedRoute, Route, Router, RouterLink } from '@angular/router';
import { UserService } from '../services/user.service';
import { FirestoreService } from '../services/firestore.service';

@Component({
  selector: 'app-note-list',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './note-list.component.html',
  styleUrl: './note-list.component.css',
})
export class NoteListComponent {
  noteList: any;
  userData: any;
  constructor(
    private _userService: UserService,
    private _firestoreService: FirestoreService,
    private router: Router
  ) { 
    this.getUserInfo()
  }

  async getUserInfo(){
    const user =  this._userService.getUser()
    if(user !== null && user?.email!==null){
      this.userData = await this._firestoreService.getUserByEmail(user.email)
      this.getNotes();
    }
  }

  async getNotes() {
    const username = this.userData.username;
    this.noteList = await this._firestoreService.getNotes(username);
    console.log(this.noteList)
  }

  async newNote(){
    if(this.userData.username!== undefined){

      const newNoteId = await this._firestoreService.createNote(this.userData.username,{
        title: 'Titulo',
        content: ''
      })
      if(newNoteId){
        this.router.navigate([`/notes/${newNoteId}`])
      }
    }else{
      console.error('No username in userData')
    }
  }

  goTo(noteId:string){
    this.router.navigate([`/notes/${noteId}`])
  }
}
