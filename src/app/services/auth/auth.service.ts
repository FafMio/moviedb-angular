import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {User} from '../../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoading = false;

  constructor(private router: Router, private httpClient: HttpClient) {
  }

  /**
   * Method to check if the user's password and username are correct.
   * @param fUsername Username
   * @param fPassword Password
   */
  checkCredentials(fUsername, fPassword): Observable<any> {
    this.isLoading = true;
    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    return this.httpClient.post(
      'http://127.0.0.1:8080/api/auth/signin',
      {
        username: fUsername,
        password: fPassword
      },
      {headers});
  }

  register(username, email, password): Observable<any> {
    this.isLoading = true;
    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    return this.httpClient.post(
      'http://127.0.0.1:8080/api/auth/signup/',
      {
        username,
        email,
        password,
        role: [],
      },
      {headers});
  }

  saveUser(user: User): void {
    localStorage.setItem('ac_user', JSON.stringify(user));
  }

  isAuth(): boolean {
    if (
      localStorage.getItem('ac_user') === 'null' ||
      localStorage.getItem('ac_user') === null ||
      localStorage.getItem('ac_user') === '') {
      return false;
    } else {
      return true;
    }
  }

  getUser(): User {
    if (this.isAuth()) {
      return JSON.parse(localStorage.getItem('ac_user'));
    } else {
      return null;
    }
  }

  isAdmin(): boolean {
    return (this.isAuth()) ? this.getUser().roles.includes('ROLE_ADMIN') : false;
  }

  isModerator(): boolean {
    return (this.isAuth()) ? this.getUser().roles.includes('ROLE_MODERATOR') : false;
  }

  signOut(): void {
    this.saveUser(null);
    this.router.navigate(['/login']);
  }

}
