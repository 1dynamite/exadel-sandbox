import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { LoginData, LoginResponseOK, LoginReturn } from './login';

@Injectable({ providedIn: 'root' })
export class LoginService {
  private loginUrl = '/api/login';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {}

  login(loginData: LoginData): Observable<LoginReturn> {
    const res = this.http
      .post<any>(this.loginUrl, loginData, this.httpOptions)
      .pipe(
        map((data: LoginResponseOK) => {
          this.setSession(data);

          return { status: 200, user: data.user };
        }),
        catchError((error: HttpErrorResponse) => {
          return of({
            status: 400,
            message: error.error,
          });
        })
      );

    return res;
  }

  isLoggedIn(): boolean {
    const expiresIn = localStorage.getItem('expiresIn');
    if (expiresIn) {
      return Date.now() < Number(expiresIn);
    }
    return false;
  }

  private setSession(data: LoginResponseOK): void {
    const expiresIn = Date.now() + Number(data.expiresIn);
    localStorage.setItem('token', data.token);
    localStorage.setItem('expiresIn', String(expiresIn));
  }
}
