import {MoviesService} from '../../../services/movies/movies.service';
import {Movie} from '../../../models/movie.model';
import {Component, OnInit} from '@angular/core';
import {CategoriesService} from '../../../services/categories/categories.service';
import {Category} from '../../../models/category.model';

@Component({
  selector: 'app-movie-view',
  templateUrl: './movies-view.component.html',
  styleUrls: ['./movies-view.component.css']
})
export class MoviesViewComponent implements OnInit {

  allMovies: Array<Movie>;
  allCategories: Array<Category>;

  constructor(
    private movieService: MoviesService,
    private categoriesService: CategoriesService
  ) {
    this.movieService.movieSubject.subscribe(
      (movies: Array<Movie>) => this.allMovies = movies
    );
    this.categoriesService.categorySubject.subscribe(
      (category: Array<Category>) => this.allCategories = category
    );
  }

  ngOnInit(): void {
  }

}
