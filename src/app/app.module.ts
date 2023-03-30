import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import {LoginViewComponent} from './views/auth/login-view/login-view.component';
import {HeaderComponent} from './components/header/header.component';
import {MovieDetailsViewComponent} from './views/front/movie-details-view/movie-details-view.component';
import {NotFoundViewComponent} from './views/not-found-view/not-found-view.component';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AlertModule} from 'ngx-bootstrap/alert';
import {BsDropdownModule} from 'ngx-bootstrap/dropdown';
import {BsDatepickerModule} from 'ngx-bootstrap/datepicker';
import {MoviesViewComponent} from './views/front/movies-view/movies-view.component';
import {MovieNewViewComponent} from './views/movies-new-view/movie-new-view.component';
import {MovieEditViewComponent} from './views/movie-edit-view/movie-edit-view.component';
import { CategoryCardComponent } from './components/category-card/category-card.component';
import { MovieCardComponent } from './components/movie-card/movie-card.component';
import { CategoryBadgeComponent } from './components/category-badge/category-badge.component';
import { MoviesCategoryViewComponent } from './views/front/movies-category-view/movies-category-view.component';
import {SplitPipe} from "./pipe/split-pipe";


@NgModule({
  declarations: [
    AppComponent,
    LoginViewComponent,
    HeaderComponent,
    MoviesViewComponent,
    MovieDetailsViewComponent,
    MovieNewViewComponent,
    NotFoundViewComponent,
    MovieEditViewComponent,
    CategoryCardComponent,
    MovieCardComponent,
    CategoryBadgeComponent,
    MovieCardComponent,
    MoviesCategoryViewComponent,

    SplitPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AlertModule.forRoot(),
    BsDropdownModule.forRoot(),
    BsDatepickerModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
