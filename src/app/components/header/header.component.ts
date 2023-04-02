import {UtilsService} from '../../services/utils/utils.service';
import {AuthService} from '../../services/auth/auth.service';
import {Component, OnInit} from '@angular/core';
import {User} from '../../models/user.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isAuth: boolean;
  randomUrl: string = UtilsService.randomString(20);
  user: User;

  constructor(
    public authService: AuthService,
    public router: Router
  ) {
  }

  ngOnInit(): void {
    this.isAuth = this.authService.isAuth();
    this.user = this.authService.getUser();
  }


  onClickSignOut(): void {
    this.authService.signOut();
  }
}
