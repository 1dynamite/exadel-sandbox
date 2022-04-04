import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { LoginService } from './login.service';
import { Router } from '@angular/router';
import { User } from '../user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });

  serverErrorMessage: string | null | undefined = null;

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private router: Router
  ) {}

  onSubmit(): void {
    this.loginService.login(this.loginForm.value).subscribe((res) => {
      if (res.status === 200) {
        this.serverErrorMessage = null;

        const userFromResponse: User | undefined = res.user;

        this.router.navigateByUrl('/dashboard', {
          state: {
            user: userFromResponse,
          },
        });
      } else {
        this.serverErrorMessage = res.message;
      }
    });
  }

  getErrorMessage(field: string): string {
    if (this.loginForm.get(field)?.hasError('required')) {
      return 'Required field should not be empty';
    }

    if (this.loginForm.get(field)?.hasError('email')) {
      return 'Please enter a valid email address';
    }

    return this.loginForm.get(field)?.hasError('minlength')
      ? 'Password should contain at least 8 characters'
      : '';
  }
}
