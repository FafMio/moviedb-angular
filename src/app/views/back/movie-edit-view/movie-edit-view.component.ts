import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {MoviesService} from '../../../services/movies/movies.service';
import {Movie} from '../../../models/movie.model';
import {Category} from '../../../models/category.model';
import {CategoriesService} from '../../../services/categories/categories.service';

@Component({
  selector: 'app-movie-edit-view',
  templateUrl: './movie-edit-view.component.html',
  styleUrls: ['./movie-edit-view.component.css']
})
export class MovieEditViewComponent implements OnInit {

  movie: Movie;
  editMovieForm: FormGroup;
  categories: Array<Category>;

  isLoading = false;
  isError = false;
  isEdited = false;
  btnColor = 'info';
  iconIcon = 'question';
  id: number;

  constructor(
    private moviesService: MoviesService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private categoriesService: CategoriesService
  ) {
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params.id;

    this.categories = this.categoriesService.getAllCategories();

    this.moviesService.getMovie(this.id).subscribe(
      (res: any) => {
        this.movie = res;
        this.initForm();

        setTimeout(() => {
          const cat = document.querySelector('#categories');
          if (cat) {
            this.categories.forEach(elem => {
              const sub = document.createElement('option');
              sub.value = String(elem.id);
              sub.innerText = elem.title;

              if (this.movie.categories.map(c => c.id).includes(elem.id)) {
                sub.selected = true;
              }
              cat.appendChild(sub);
            });
          }
        }, 250);
      }
    );
  }


  initForm(): void {
    this.editMovieForm = this.formBuilder.group({
      title: [this.movie.title, Validators.required],
      imageUrl: [this.movie.imageUrl, Validators.required],
      originCountry: [this.movie.originCountry, Validators.required],
      originCountryShort: [this.movie.originCountryShort, Validators.required],
      releasedAt: [this.movie.releasedAt.toLocaleString(), Validators.required],
      synopsis: [this.movie.synopsis, Validators.required],
      tmdbId: [this.movie.tmdbId, Validators.required],
      categories: [this.movie.categories, Validators.required],
    });
  }


  onSubmitEditMovie(): void {
    const formValue = this.editMovieForm.value;
    const movie = {
      id: this.id,
      title: formValue.title,
      synopsis: formValue.synopsis,
      releasedAt: formValue.releasedAt,
      imageUrl: formValue.imageUrl,
      originCountry: formValue.originCountry,
      originCountryShort: formValue.originCountryShort,
      tmdbId: formValue.tmdbId,
      categories: formValue.categories.map(e => {
        if (typeof e === 'string') {
          return {id: e};
        } else {
          return e;
        }
      })
    };

    console.log(movie);
    console.log(JSON.stringify(movie));

    this.moviesService.updateMovie(movie).subscribe(
      (res: any) => {
        this.isLoading = false;
        this.isError = false;
        this.isEdited = true;
        this.btnColor = 'success';
        this.iconIcon = 'check2';

        setTimeout(() => {
          this.moviesService.callForTeam();
          this.router.navigate(['/dashboard']);
        }, 2000);
      },
      error => {
        this.isLoading = false;
        this.isError = true;
        this.isEdited = false;
        this.btnColor = 'danger';
        this.iconIcon = 'exclamation-triangle-fill';

        setTimeout(() => {
          this.resetButton();
        }, 2000);
      }
    );
  }

  resetButton(): void {
    this.isError = false;
    this.isEdited = false;
    this.btnColor = 'info';
    this.iconIcon = 'question';
  }

}
