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
import { CategoryCardComponent } from './components/category-card/category-card.component';
import { MovieCardComponent } from './components/movie-card/movie-card.component';
import { CategoryBadgeComponent } from './components/category-badge/category-badge.component';
import { MoviesCategoryViewComponent } from './views/front/movies-category-view/movies-category-view.component';
import {SplitPipe} from './pipes/split-pipe';
import { RegisterViewComponent } from './views/auth/register-view/register-view.component';
import { NewCategoryComponent } from './views/back/category/new-category/new-category.component';
import { DashboardComponent } from './views/back/dashboard/dashboard.component';
import { DashboardCardComponent } from './components/dashboard-card/dashboard-card.component';
import { MovieLineComponent } from './components/dashboard/table/movie-line/movie-line.component';
import {MovieEditViewComponent} from './views/back/movie-edit-view/movie-edit-view.component';
import {MovieCreateViewComponent} from './views/back/movie-create-view/movie-create-view.component';
import {CastCardComponent} from './components/cast-card/cast-card.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginViewComponent,
    HeaderComponent,
    MoviesViewComponent,
    MovieDetailsViewComponent,
    MovieCreateViewComponent,
    NotFoundViewComponent,
    MovieEditViewComponent,
    CategoryCardComponent,
    MovieCardComponent,
    CategoryBadgeComponent,
    MovieCardComponent,
    MoviesCategoryViewComponent,
    SplitPipe,
    RegisterViewComponent,
    NewCategoryComponent,
    DashboardComponent,
    DashboardCardComponent,
    MovieLineComponent,
    CastCardComponent
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
