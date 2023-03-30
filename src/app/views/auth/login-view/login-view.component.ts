import {AuthService} from '../../../services/auth/auth.service';
import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {MoviesService} from '../../../services/movies/movies.service';

@Component({
  selector: 'app-login-view',
  templateUrl: './login-view.component.html',
  styleUrls: ['./login-view.component.css']
})
export class LoginViewComponent implements OnInit {

  authForm: FormGroup;
  errorMessage: string;

  constructor(
    public authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder,
    private moviesService: MoviesService
  ) {
  }

  ngOnInit(): void {
    // ? Init the Login Form
    this.authForm = this.formBuilder.group(
      {
        username: ['', [Validators.required]],
        password: ['', [Validators.required]]
      }
    );
  }

  onSubmitSignIn(): void {
    this.errorMessage = '';
    const username = this.authForm.value.username;
    const password = this.authForm.value.password;

    this.authService.checkCredentials(username, password)
      .subscribe(
        (result) => {
          console.log(result);
          this.moviesService.init();
          this.authService.isLoading = false;
          this.authService.token = result.accessToken;
          this.router.navigate(['/series']);
        },
        (error) => {
          this.authService.isLoading = false;
          this.errorMessage = error;
        }
      );
  }

}
