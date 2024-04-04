import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-banner',
  standalone: true,
  imports: [],
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.css',
})
export class BannerComponent implements OnInit {
  public isLoggedIn!: boolean;
  constructor(private _userService: UserService) {
    this._userService.isLoggedIn.subscribe((value) => {
      this.isLoggedIn = value;
    });
  }

  ngOnInit(): void {
    this._userService.getCurrentUser();
  }

  async signOut() {
    await this._userService.signOut();
  }
}
