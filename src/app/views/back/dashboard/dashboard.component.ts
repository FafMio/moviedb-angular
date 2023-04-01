import {Component, OnInit} from '@angular/core';
import {MoviesService} from '../../../services/movies/movies.service';
import {UsersService} from '../../../services/users/users.service';
import {Movie} from '../../../models/movie.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  movieCount: number;
  unverifiedCount: number;
  verifiedCount: number;
  userCount: number;
  movies: Array<Movie>;
  unverifiedMovies: Array<Movie>;

  constructor(
    private moviesService: MoviesService,
    private usersService: UsersService
  ) {
  }

  ngOnInit(): void {
    this.count();
    this.moviesService.movieUnverifiedSubject.subscribe(
      (unverifiedMovies: Array<Movie>) => {
        this.unverifiedMovies = unverifiedMovies;
        this.count();
      }
    );
    this.moviesService.movieSubject.subscribe(
      (movies: Array<Movie>) => {
        this.movies = movies;
        this.count();
      }
    );
  }

  count(): void {
    this.moviesService.countMovies()
      .subscribe(
        (res: any) => {
          this.movieCount = res;
        }
      );
    this.moviesService.countUnverifiedMovies()
      .subscribe(
        (res: any) => {
          this.unverifiedCount = res;
        }
      );
    this.moviesService.countVerifiedMovies()
      .subscribe(
        (res: any) => {
          this.verifiedCount = res;
        }
      );
    this.usersService.countUsers()
      .subscribe(
        (res: any) => {
          this.userCount = res;
        }
      );
  }
}
