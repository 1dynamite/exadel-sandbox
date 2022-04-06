import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import jwt_decode from 'jwt-decode';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { User } from '../user';

interface JWTPayload {
  _id: string;
  email: string;
  name: {
    firstName: string;
    lastName?: string;
  };
  role: string;
}

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  userUrl: string | null;

  constructor(private http: HttpClient) {
    const token = localStorage.getItem('token');

    if (token) {
      const decoded: JWTPayload = jwt_decode(token);

      this.userUrl = `/api/users/${decoded._id}`;
    } else {
      this.userUrl = null;
    }
  }

  getUser(): Observable<User> | Observable<never> {
    if (!this.userUrl) {
      return throwError(() => new Error('User is unauthenticated'));
    }

    const res = this.http.get<User>(this.userUrl).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(() => error);
      })
    );

    return res;
  }
}
