import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  token: string;
  isAuth = false;

  isLoading = false;

  constructor(private router: Router, private httpClient: HttpClient) { }

  /**
   * Method to check if the user's password and username are correct.
   * @param fUsername Username
   * @param fPassword Password
   */
  checkCredentials(fUsername, fPassword): Observable<any> {
    this.isLoading = true;
    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    return this.httpClient.post('http://127.0.0.1:8080/api/auth/signin', {username: fUsername, password: fPassword}, {headers});
  }

  /**
   * Method to logout correctly.
   */
  signOut(): void {
    this.token = '';
    this.isAuth = false;
    this.router.navigate(['/login']);
  }

}
