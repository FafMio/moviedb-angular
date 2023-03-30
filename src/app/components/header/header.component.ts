import { UtilsService } from './../../services/utils/utils.service';
import { AuthService } from './../../services/auth/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isAuth: boolean;
  randomUrl: string = UtilsService.randomString(20);

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.isAuth = this.authService.isAuth;
  }

  /**
   * Method to signout
   */
  onClickSignOut() {
    this.authService.signOut();
  }
}
