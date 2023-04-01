import {AuthService} from '../../../services/auth/auth.service';
import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {User} from '../../../models/user.model';

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
    private formBuilder: FormBuilder
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
          this.authService.isLoading = false;
          this.authService.saveUser(new User(
            result.id,
            result.username,
            result.password,
            result.email,
            result.roles.map(role => {
              return role;
            }),
            result.accessToken,
            result.tokenType,
          ));
          this.router.navigate(['/']);
        },
        (error) => {
          console.log(error);
          this.authService.isLoading = false;
          if (error.error.message === undefined) {
            this.errorMessage = error.statusText;
          } else {
            this.errorMessage = error.error.message;
          }
        }
      );
  }

}
