import {Component, Input, OnInit} from '@angular/core';
import {Movie} from '../../../../models/movie.model';
import {MoviesService} from '../../../../services/movies/movies.service';
import {AuthService} from '../../../../services/auth/auth.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: '[app-movie-line]',
  templateUrl: './movie-line.component.html',
  styleUrls: ['./movie-line.component.css']
})
export class MovieLineComponent implements OnInit {

  @Input() movie: Movie;
  isDeleting = false;
  isUpdating = false;

  iconDelete = 'trash';
  iconVerify = 'check2';

  constructor(
    private moviesService: MoviesService,
    public authService: AuthService
  ) {
  }

  ngOnInit(): void {
    this.iconVerify = this.movie.isVerified ? 'x' : 'check2';
  }

  onClickDelete(): void {
    this.isDeleting = true;
    this.moviesService.deleteMovie(this.movie.id);
  }

  onClickVerify(): void {
    this.isUpdating = true;
    this.moviesService.verifyMovie(this.movie.id).subscribe(
      (res: any) => {
        this.isUpdating = false;
        this.iconVerify = 'check2-all';
        setTimeout(() => {
          this.moviesService.init();
        }, 1500);
      },
      (err: any) => {
        console.log(err);
      }
    );
  }

  onClickUnverify(): void {
    this.isUpdating = true;
    this.moviesService.unverifyMovie(this.movie.id).subscribe(
      (res: any) => {
        this.isUpdating = false;
        this.iconVerify = 'x';
        setTimeout(() => {
          this.moviesService.init();
        }, 1500);
      },
      (err: any) => {
        console.log(err);
      }
    );
  }
}
