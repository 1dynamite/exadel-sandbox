import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Transaction } from 'src/app/dashboard/models';

@Injectable({
  providedIn: 'root',
})
export class TransactionsService {
  constructor(private http: HttpClient) {}

  getTransactions(
    userId: string,
    accountId: string
  ): Observable<Transaction[]> | Observable<never> {
    const url = `/api/users/${userId}/accounts/${accountId}/transactions`;

    const res = this.http.get<Transaction[]>(url).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(() => error);
      })
    );

    return res;
  }
}
