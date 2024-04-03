import { Component, OnInit, signal } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-banner',
  standalone: true,
  imports: [],
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.css'
})
export class BannerComponent implements OnInit {
  constructor(private _userService:UserService){}
  public isLoggedIn = signal(false)
  async ngOnInit(): Promise<void> {
      const currentUser = await this._userService.getCurrentUser();
      this.isLoggedIn.update(value=>currentUser)
  }

}
