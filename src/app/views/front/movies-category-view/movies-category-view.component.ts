import {Component, OnInit} from '@angular/core';
import {MoviesService} from '../../../services/movies/movies.service';
import {ActivatedRoute} from '@angular/router';
import {Movie} from '../../../models/movie.model';
import {CategoriesService} from '../../../services/categories/categories.service';
import {Category} from '../../../models/category.model';

@Component({
  selector: 'app-movies-category-view',
  templateUrl: './movies-category-view.component.html',
  styleUrls: ['./movies-category-view.component.css']
})
export class MoviesCategoryViewComponent implements OnInit {

  movies: Array<Movie>;
  categories: Array<Category>;
  categoryTitle: string;

  constructor(
    private moviesService: MoviesService,
    private categoriesService: CategoriesService,
    private route: ActivatedRoute
  ) {

    this.movies = new Array<Movie>();
    this.categories = new Array<Category>();
  }

  ngOnInit(): void {
    this.categoryTitle = this.route.snapshot.params.title;
    this.movies = this.moviesService.getAllMovies(this.categoryTitle);
    this.categories = this.categoriesService.getAllCategories();
    console.log(this.movies);
  }

}
