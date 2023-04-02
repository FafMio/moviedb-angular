import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(
    private httpClient: HttpClient
  ) { }



  countUsers(): Observable<any> {
    return this.httpClient.get('https://api.allocinoche.top/api/user/count/');
  }
}
