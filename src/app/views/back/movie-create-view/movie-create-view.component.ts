import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {MoviesService} from '../../../services/movies/movies.service';
import {Movie} from '../../../models/movie.model';
import {Category} from '../../../models/category.model';
import {CategoriesService} from '../../../services/categories/categories.service';

@Component({
  selector: 'app-movie-create-view',
  templateUrl: './movie-create-view.component.html',
  styleUrls: ['./movie-create-view.component.css']
})
export class MovieCreateViewComponent implements OnInit {

  createMovieForm: FormGroup;
  categories: Array<Category>;

  isLoading = false;
  isError = false;
  isAdded = false;
  btnColor = 'info';
  iconIcon = 'question';

  constructor(
    private moviesService: MoviesService,
    private categoriesService: CategoriesService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
  ) {
  }

  ngOnInit(): void {
    this.categories = this.categoriesService.getAllCategories();

    this.initForm();

    setTimeout(() => {
      const cat = document.querySelector('#categories');
      if (cat) {
        this.categories.forEach(elem => {
          const sub = document.createElement('option');
          sub.value = String(elem.id);
          sub.innerText = elem.title;
          cat.appendChild(sub);
        });
      }
    }, 250);
  }


  initForm(): void {
    this.createMovieForm = this.formBuilder.group({
      title: ['', Validators.required],
      imageUrl: ['', Validators.required],
      originCountry: ['', Validators.required],
      originCountryShort: ['', Validators.required],
      releasedAt: ['', Validators.required],
      synopsis: ['', Validators.required],
      tmdbId: ['', Validators.required],
      categories: ['', Validators.required],
    });
  }


  onSubmitEditMovie(): void {
    this.isLoading = true;

    const formValue = this.createMovieForm.value;
    const movie = {
      id: null,
      title: formValue.title,
      synopsis: formValue.synopsis,
      releasedAt: formValue.releasedAt,
      imageUrl: formValue.imageUrl,
      originCountry: formValue.originCountry,
      originCountryShort: formValue.originCountryShort,
      tmdbId: formValue.tmdbId,
      categories: formValue.categories.map(e => {
        return {id: e};
      })
    };

    console.log(movie);
    this.moviesService.addMovie(JSON.stringify(movie)).subscribe(
      (res: any) => {
        this.moviesService.movies.push(res);

        this.isLoading = false;
        this.isError = false;
        this.isAdded = true;
        this.btnColor = 'success';
        this.iconIcon = 'check2';

        setTimeout(() => {
          this.moviesService.callForTeam();
          this.router.navigate(['/dashboard']);
        }, 2000);
      },
      (err) => {
        this.isLoading = false;
        this.isError = true;
        this.isAdded = false;
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
    this.isAdded = false;
    this.btnColor = 'info';
    this.iconIcon = 'question';
  }

}
