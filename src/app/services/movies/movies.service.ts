import {AuthService} from '../auth/auth.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {Movie} from '../../models/movie.model';
import {Category} from '../../models/category.model';

@Injectable({
  providedIn: 'root'
})

export class MoviesService {

  movieSubject: BehaviorSubject<Array<Movie>>;
  movieUnverifiedSubject: BehaviorSubject<Array<Movie>>;

  movies: Array<Movie>;
  movieUnverified: Array<Movie>;

  constructor(
    private httpClient: HttpClient,
    private authService: AuthService
  ) {
    this.movieSubject = new BehaviorSubject<Array<Movie>>([]);
    this.movieUnverifiedSubject = new BehaviorSubject<Array<Movie>>([]);
    setTimeout(() => this.init(), 500);
  }


  init(): void {
    this.movies = this.getAllMovies();
    this.movieSubject.next(this.movies);
    this.callForTeam();
  }

  callForTeam(): void {
    if (this.authService.isModerator() || this.authService.isAdmin()) {
      this.movieUnverified = this.getAllUnverifiedMovies();
      this.movieUnverifiedSubject.next(this.movieUnverified);
    }
  }

  getAllMovies(category: string = null): Array<Movie> {
    const allMovies: Array<Movie> = [];
    this.httpClient
      .get('https://api.allocinoche.top/api/movie/' + (category != null ? 'category/' + category : '') + '?size=50&sortBy=id&sortDirection=DESC')
      .subscribe(
        (res: any) => {
          const data = res.content;
          data.forEach(s => {
            const currentMovie = new Movie(
              s.id,
              s.title,
              s.synopsis,
              s.releasedAt,
              s.imageUrl,
              s.originCountry,
              s.originCountryShort,
              s.tmdbId,
              s.verified,
              // tslint:disable-next-line:no-shadowed-variable
              s.categories.map(category => {
                return new Category(
                  category.id,
                  category.title,
                  category.bgHexColor,
                  category.textHexColor
                );
              }));

            allMovies.push(currentMovie);
          });
        }
      );
    return allMovies;
  }

  getAllUnverifiedMovies(): Array<Movie> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.authService.getUser().accessToken);
    const allMovies: Array<Movie> = [];
    this.httpClient
      .get('https://api.allocinoche.top/api/movie/unverified?size=50&sortBy=id&sortDirection=DESC', {headers})
      .subscribe(
        (res: any) => {
          const data = res.content;
          data.forEach(s => {
            const currentMovie = new Movie(
              s.id,
              s.title,
              s.synopsis,
              s.releasedAt,
              s.imageUrl,
              s.originCountry,
              s.originCountryShort,
              s.tmdbId,
              s.verified,
              // tslint:disable-next-line:no-shadowed-variable
              s.categories.map(category => {
                return new Category(
                  category.id,
                  category.title,
                  category.bgHexColor,
                  category.textHexColor
                );
              }));

            allMovies.push(currentMovie);
          });
        }
      );
    return allMovies;
  }

  getMovie(fId: number): Observable<any> {
    return this.httpClient.get('https://api.allocinoche.top/api/movie/' + fId);
  }

  addMovie(movie: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + this.authService.getUser().accessToken
    });
    return this.httpClient.post('https://api.allocinoche.top/api/movie/', movie, {headers});
  }

  deleteMovie(fId: number): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.authService.getUser().accessToken);
    return this.httpClient.delete('https://api.allocinoche.top/api/movie/' + fId, {headers});
  }

  updateMovie(movie: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + this.authService.getUser().accessToken
    });
    return this.httpClient.post('https://api.allocinoche.top/api/movie/' + movie.id, movie, {headers});
  }

  countMovies(): Observable<any> {
    return this.httpClient.get('https://api.allocinoche.top/api/movie/count/');
  }

  countUnverifiedMovies(): Observable<any> {
    return this.httpClient.get('https://api.allocinoche.top/api/movie/countUnverified/');
  }

  countVerifiedMovies(): Observable<any> {
    return this.httpClient.get('https://api.allocinoche.top/api/movie/countVerified/');
  }

  verifyMovie(id: number): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.authService.getUser().accessToken);
    return this.httpClient.post('https://api.allocinoche.top/api/movie/verify/' + id, null, {headers});
  }

  unverifyMovie(id: number): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.authService.getUser().accessToken);
    return this.httpClient.post('https://api.allocinoche.top/api/movie/unverify/' + id, null, {headers});
  }

}
