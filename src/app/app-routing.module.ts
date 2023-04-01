import {NotFoundViewComponent} from './views/not-found-view/not-found-view.component';
import {AuthGuardGuard} from './guards/auth/auth-guard.guard';
import {LoginViewComponent} from './views/auth/login-view/login-view.component';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MoviesViewComponent} from './views/front/movies-view/movies-view.component';
import {MovieDetailsViewComponent} from './views/front/movie-details-view/movie-details-view.component';
import {MovieNewViewComponent} from './views/movies-new-view/movie-new-view.component';
import {MovieEditViewComponent} from './views/movie-edit-view/movie-edit-view.component';
import {MoviesCategoryViewComponent} from './views/front/movies-category-view/movies-category-view.component';
import {RegisterViewComponent} from './views/auth/register-view/register-view.component';
import {NewCategoryComponent} from './views/back/category/new-category/new-category.component';
import {DashboardComponent} from './views/back/dashboard/dashboard.component';

const routes: Routes = [
  {path: '', component: MoviesViewComponent},

  {path: 'login', component: LoginViewComponent},
  {path: 'register', component: RegisterViewComponent},
  {path: 'category/:title', component: MoviesCategoryViewComponent},

  {path: 'dashboard', canActivate: [AuthGuardGuard], component: DashboardComponent},
  {path: 'dashboard/category/:id', canActivate: [AuthGuardGuard], component: NewCategoryComponent},
  {path: 'movie/edit/:id', canActivate: [AuthGuardGuard], component: MovieEditViewComponent},

  {path: 'movie/:id', component: MovieDetailsViewComponent},
  {path: 'movies/add', canActivate: [AuthGuardGuard], component: MovieNewViewComponent},

  {path: '**', component: NotFoundViewComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
