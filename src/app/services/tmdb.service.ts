import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TmdbService {

  baseUri = 'https://api.themoviedb.org/3/';
  endUri = 'api_key=f8dd28041079edd365311590712b3dfc&language=fr-FR&include_adult=true';

  constructor(
    private httpClient: HttpClient
  ) {
  }

  getCasts(tmdbId: string): Observable<any> {
    const url = this.baseUri + 'movie/' + tmdbId + '/credits?' + this.endUri;
    return this.httpClient.get(url);
  }
}
