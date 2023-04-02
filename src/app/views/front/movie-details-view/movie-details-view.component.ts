import {Movie} from '../../../models/movie.model';
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {MoviesService} from '../../../services/movies/movies.service';
import {Category} from '../../../models/category.model';
import {TmdbService} from '../../../services/tmdb.service';

@Component({
  selector: 'app-movie-details-view',
  templateUrl: './movie-details-view.component.html',
  styleUrls: ['./movie-details-view.component.css']
})
export class MovieDetailsViewComponent implements OnInit {

  movie: Movie;
  casts: Array<any> = new Array<any>();

  constructor(
    private moviesService: MoviesService,
    private tmdbService: TmdbService,
    private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    const id = this.route.snapshot.params.id;

    this.moviesService.getMovie(id).subscribe(
      (res: any) => {
        this.movie = new Movie(
          res.id,
          res.title,
          res.synopsis,
          res.releasedAt,
          res.imageUrl,
          res.originCountry,
          res.originCountryShort,
          res.tmdbId,
          res.isVerified,
          res.categories.map(category => {
            return new Category(
              category.id,
              category.title,
              category.bgHexColor,
              category.textHexColor
            );
          }));

        this.tmdbService.getCasts(this.movie.tmdbId).subscribe(
          result => {
            this.loadCast(result);
          },
          error => {

          }
        );
      });
  }

  loadCast(casts: any): void {
    let counter = 0;
    for (const cast of casts.cast) {
      if (counter > 3) {
        break;
      }
      counter++;
      this.casts.push({
        name: cast.original_name,
        image: cast.profile_path,
      });
    }
    console.log(this.casts);
  }
}
