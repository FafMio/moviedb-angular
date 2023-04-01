import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {MoviesService} from '../../services/movies/movies.service';
import {Movie} from '../../models/movie.model';
import {Category} from '../../models/category.model';
import {CategoriesService} from "../../services/categories/categories.service";

@Component({
  selector: 'app-movie-edit-view',
  templateUrl: './movie-edit-view.component.html',
  styleUrls: ['./movie-edit-view.component.css']
})
export class MovieEditViewComponent implements OnInit {

  movie: Movie;
  editMovieForm: FormGroup;
  categories: Array<Category>;

  constructor(
    private moviesService: MoviesService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private categoriesService: CategoriesService
  ) {
  }

  ngOnInit(): void {
    const id = this.route.snapshot.params.id;

    this.categories = this.categoriesService.getAllCategories();

    this.moviesService.getMovie(id).subscribe(
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
    this.movie.title = formValue.title;
    this.movie.imageUrl = formValue.imageUrl;
    this.movie.originCountry = formValue.originCountry;
    this.movie.originCountryShort = formValue.originCountryShort;
    this.movie.releasedAt = formValue.releasedAt;
    this.movie.synopsis = formValue.synopsis;
    this.movie.tmdbId = formValue.tmdbId;
    console.log(formValue.categories);

    this.movie.categories = formValue.categories.map(e => {
      return {id: e};
    });

    this.moviesService.updateMovie(this.movie);
    setTimeout(() => {
      this.moviesService.callForTeam();
      this.router.navigate(['/dashboard']);
    }, 200);
  }

}
