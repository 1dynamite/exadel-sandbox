import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { LoginService } from './login.service';
import { Router } from '@angular/router';

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

  serverErrorMessage: string | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private router: Router
  ) {}

  onSubmit() {
    this.loginService.login(this.loginForm.value).subscribe((res) => {
      if (res.status === 200) {
        this.serverErrorMessage = null;

        this.router.navigateByUrl('/dashboard', {
          state: res.user,
        });
      } else {
        this.serverErrorMessage = res.message;
      }
    });
  }

  getErrorMessage(field: string) {
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
