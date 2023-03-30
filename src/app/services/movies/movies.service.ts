import {AuthService} from '../auth/auth.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject, Observable, Subscription} from 'rxjs';
import {Injectable} from '@angular/core';
import {Movie} from '../../models/movie.model';
import {Category} from '../../models/category.model';

@Injectable({
  providedIn: 'root'
})

export class MoviesService {

  movieSubject: BehaviorSubject<Array<Movie>>;

  movies: Array<Movie>;

  constructor(private httpClient: HttpClient, private authService: AuthService) {
    this.movieSubject = new BehaviorSubject<Array<Movie>>([]);
    this.init();
  }


  init(): void {
    this.movies = this.getAllMovies();
    this.movieSubject.next(this.movies);
  }


  getAllMovies(category: string = null): Array<Movie> {
    const allMovies: Array<Movie> = [];
    this.httpClient
      .get('http://127.0.0.1:8080/api/movie/' + (category != null ? 'category/' + category : ''))
      .subscribe(
        (res: any) => {
          const data = res.content;
          console.log(data);
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
              s.isVerified,
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
    return this.httpClient.get('http://127.0.0.1:8080/api/movie/' + fId);
  }

  addMovie(fSerie: any): void {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    this.httpClient.post('http://127.0.0.1:8080/api/movie', fSerie, {headers}).subscribe(
      (res: any) => {
        this.movies.push(res);
        this.movieSubject.next(this.getAllMovies());
      },
      (err) => {
        console.log('error: ', err);
      }
    );
  }

  deleteMovie(fId: number): Subscription {
    return this.httpClient.delete('http://127.0.0.1:8080/api/movie/' + fId)
      .subscribe(
        (res: any) => {
          for (let i = 0; i < this.movieSubject.getValue().length; i++) {
            if (this.movies[i].id === fId) {
              this.movies.splice(i, 1);
              this.movieSubject.next(this.movies);
            }
          }
        }
      );
  }


  updateMovie(fSerie: Movie): void {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.authService.token.toString());
    // const data = {
    //   name: fSerie.name,
    //   description: fSerie.description,
    //   critical: fSerie.critical,
    //   seasons: fSerie.seasons,
    //   releaseDate: new Date(fSerie.release_date).toISOString(),
    //   poster: fSerie.picture,
    // };

    const data = {
      id: fSerie.id,
      title: fSerie.title,
      synopsis: fSerie.synopsis,
      releasedAt: fSerie.releasedAt,
      imageUrl: fSerie.imageUrl,
      originCountry: fSerie.originCountry,
      originCountryShort: fSerie.originCountryShort,
      tmdbId: fSerie.tmdbId,
      isVerified: fSerie.isVerified
    };

    this.httpClient.put(
      'http://127.0.0.1:8080/api/movie/' + fSerie.id,
      data,
      {headers}
    ).subscribe(
      (res: any) => {
        this.movieSubject.next(this.getAllMovies());
      }
    );
  }

}
