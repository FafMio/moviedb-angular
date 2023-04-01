import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../../services/auth/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register-view',
  templateUrl: './register-view.component.html',
  styleUrls: ['./register-view.component.css']
})
export class RegisterViewComponent implements OnInit {

  registerForm: FormGroup;
  errorMessage: string;
  success: boolean;

  constructor(
    public authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
  }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group(
      {
        username: ['', [Validators.required, Validators.min(4), Validators.max(20)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.min(6), Validators.max(40)]],
      }
    );
  }

  onSubmitSignIn(): void {
    this.authService.isLoading = true;
    this.errorMessage = undefined;
    const username = this.registerForm.value.username;
    const password = this.registerForm.value.password;
    const email = this.registerForm.value.email;

    this.authService.register(username, email, password)
      .subscribe(
        result => {
          this.registerForm.disable();
          this.success = true;
          this.authService.isLoading = false;
        },
        (err) => {
          console.log(err);
          if (err.status === 200) {
            this.registerForm.disable();
            this.success = true;
            this.authService.isLoading = false;
          } else {
            this.authService.isLoading = false;
            if (err.error instanceof ProgressEvent) {
              this.errorMessage = err.statusText;
            } else {
              this.errorMessage = err.error;
            }
          }
        },
      );
  }

}
