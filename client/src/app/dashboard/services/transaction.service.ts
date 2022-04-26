import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Category, Transaction } from '../models';

interface ServerResponseType {
  message: string;
  body: Transaction;
  accountBalance: number;
}
@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  constructor(private http: HttpClient) {}

  getCategories(
    userId: string,
    categories: string[]
  ): Observable<Category[]> | Observable<never> {
    const url = `/api/users/${userId}/categories/`;

    const res = this.http.put<Category[]>(url, { categories }).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(() => error);
      })
    );

    return res;
  }

  getCategoriesByType(
    userId: string,
    type: string
  ): Observable<Category[]> | Observable<never> {
    const url = `/api/users/${userId}/categories/?type=${type}`;

    const res = this.http.get<Category[]>(url).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(() => error);
      })
    );

    return res;
  }

  addTransaction(
    userId: string,
    accountId: string,
    body: Transaction
  ): Observable<ServerResponseType> | Observable<never> {
    const url = `/api/users/${userId}/accounts/${accountId}/transactions`;

    const res = this.http.post<ServerResponseType>(url, body).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(() => error);
      })
    );

    return res;
  }

  editTransaction(
    userId: string,
    accountId: string,
    transactionId: string,
    body: Transaction
  ): Observable<ServerResponseType> | Observable<never> {
    const url = `/api/users/${userId}/accounts/${accountId}/transactions/${transactionId}`;

    const res = this.http.put<ServerResponseType>(url, body).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(() => error);
      })
    );

    return res;
  }

  deleteTransaction(
    userId: string,
    accountId: string,
    transactionId: string
  ): Observable<ServerResponseType> | Observable<never> {
    const url = `/api/users/${userId}/accounts/${accountId}/transactions/${transactionId}`;

    const res = this.http.delete<ServerResponseType>(url).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(() => error);
      })
    );

    return res;
  }
}
