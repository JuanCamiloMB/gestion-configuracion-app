import { Component, OnInit, WritableSignal, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  title:WritableSignal<string> = signal('')
  content:WritableSignal<string> = signal('')
  constructor(
    private activatedRoute: ActivatedRoute,
    private _userService: UserService,
    private _firestoreService: FirestoreService,
    private router: Router
  ) {}

  async ngOnInit(): Promise<void> {
    this.noteId = this.activatedRoute.snapshot.paramMap.get('id');
    this.getUserInfo()
  }

  async getUserInfo(){
    const user =  this._userService.getUser()
    if(user !== null && user?.email!==null){
      this.userData = await this._firestoreService.getUserByEmail(user.email)
      this.getNote();
    }
  }

  async getNote(){
    const username = this.userData.username;
    this.noteData = await this._firestoreService.getNote(username, this.noteId)
    //
    this.title.set(this.noteData.title)
    this.content.set(this.noteData.content)
  }

  handleChangeContent(event:any){
    this.content.set(event.target.value);
  }

  handleChangeTitle(event:any){
    this.title.set(event.target.value);
  }

  saveNote(){
    const note ={
      ...this.noteData
    }
    note['id'] = this.noteId
    note['title'] = this.title()
    note['content'] = this.content()
    this._firestoreService.updateNote(this.userData.username, note)
  }
  deleteNote(){
    this._firestoreService.deleteNote(this.userData.username, this.noteId)
    this.router.navigate(['/notes'])
  }

  goBack(){
    this.saveNote()
    this.router.navigate(['/notes'])
  }
}
