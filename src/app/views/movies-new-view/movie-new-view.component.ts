import { MoviesService } from 'src/app/services/movies/movies.service';
import { Serie } from '../../models/serie.model';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-serie-new-view',
  templateUrl: './movie-new-view.component.html',
  styleUrls: ['./movie-new-view.component.css']
})
export class MovieNewViewComponent implements OnInit {

  newSerie: Serie;

  constructor(private moviesService: MoviesService, private router: Router) { }

  ngOnInit(): void {
    this.newSerie = new Serie(null, "", "", "", "", null, 0, []);
  }

  /**
   * Method to submit the form and call the API to create
   */
  onSubmitNewSerie() {
    this.moviesService.addMovie({
      name: this.newSerie.name,
      description: this.newSerie.description,
      seasons: this.newSerie.seasons,
      critical: this.newSerie.critical,
      releaseDate: new Date(this.newSerie.release_date).toISOString(),
      poster: this.newSerie.picture,
    });

    this.router.navigate(['/movies']);
  }

}
