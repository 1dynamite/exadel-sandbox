import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import jwt_decode from 'jwt-decode';

import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  userUrl: string | null;

  constructor(private http: HttpClient) {
    const token = localStorage.getItem('token');

    if (token) {
      const decoded: any = jwt_decode(token);

      this.userUrl = `/api/users/${decoded._id}`;
    } else {
      this.userUrl = null;
    }
  }

  getUser() {
    if (!this.userUrl) {
      return throwError(() => new Error('User is unauthenticated'));
    }

    const res = this.http.get(this.userUrl).pipe(
      catchError((error) => {
        return throwError(() => error);
      })
    );

    return res;
  }
}
