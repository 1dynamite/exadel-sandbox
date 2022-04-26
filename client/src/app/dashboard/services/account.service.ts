import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {
  AddAccount,
  EditAccount,
  ReturnType,
  Params,
  Currency,
} from '../models';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  constructor(private http: HttpClient) {}

  addAccount(
    addAccount: AddAccount,
    userId: string
  ): Observable<ReturnType> | Observable<never> {
    const url = `/api/users/${userId}/accounts/`;

    const res = this.http.post<ReturnType>(url, addAccount).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(() => error);
      })
    );

    return res;
  }

  readAccount(params: Params): Observable<ReturnType> | Observable<never> {
    const url = `/api/users/${params.userId}/accounts/` + params.accountId;

    const res = this.http.get<ReturnType>(url).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(() => error);
      })
    );

    return res;
  }

  editAccount(
    params: Params,
    editAccount: EditAccount
  ): Observable<ReturnType> | Observable<never> {
    const url = `/api/users/${params.userId}/accounts/` + params.accountId;

    const res = this.http.put<ReturnType>(url, editAccount).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(() => error);
      })
    );

    return res;
  }

  deleteAccount(params: Params): Observable<ReturnType> | Observable<never> {
    const url = `/api/users/${params.userId}/accounts/` + params.accountId;

    const res = this.http.delete<ReturnType>(url).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(() => error);
      })
    );

    return res;
  }

  getAllCurrencies():
    | Observable<{ currencies: Currency[] }>
    | Observable<never> {
    const res = this.http
      .get<{ currencies: Currency[] }>('/api/currencies')
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return throwError(() => error);
        })
      );

    return res;
  }
}
