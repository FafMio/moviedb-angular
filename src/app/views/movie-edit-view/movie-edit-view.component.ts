import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {MoviesService} from '../../services/movies/movies.service';
import {Movie} from '../../models/movie.model';

@Component({
  selector: 'app-movie-edit-view',
  templateUrl: './movie-edit-view.component.html',
  styleUrls: ['./movie-edit-view.component.css']
})
export class MovieEditViewComponent implements OnInit {

  movie: Movie;

  editMovieForm: FormGroup;

  constructor(
    private moviesService: MoviesService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
  }

  ngOnInit(): void {
    const id = this.route.snapshot.params.id;

    this.moviesService.getMovie(id).subscribe(
      (res: any) => {
        this.movie = res;
        this.movie.releasedAt = new Date(res.release_date);

        this.initForm();
      }
    );
  }


  initForm(): void {
    this.editMovieForm = this.formBuilder.group({
      // name: [this.movie.name, Validators.required],
      // description: [this.movie.description, Validators.required],
      // critical: [this.movie.critical, Validators.required],
      // seasons: [this.movie.seasons, Validators.required],
      // release_date: [this.movie.release_date, Validators.required],
      // picture: [this.movie.picture, Validators.required],
    });
  }


  onSubmitEditMovie(): void {
    const formValue = this.editMovieForm.value;
    // this.movie.name = formValue.name
    // this.movie.description = formValue.description
    // this.movie.critical = formValue.critical
    // this.movie.seasons = formValue.seasons
    // this.movie.release_date = formValue.release_date
    // this.movie.picture = formValue.picture

    console.log(formValue.release_date);

    this.moviesService.updateMovie(this.movie);
    this.router.navigate(['/movies']);
  }

}
