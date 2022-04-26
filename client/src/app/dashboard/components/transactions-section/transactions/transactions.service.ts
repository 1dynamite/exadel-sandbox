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
    accountId: string,
    query?: {
      transactionType: 'expense' | 'income' | null;
      sortOrder: 'receivalDate' | 'createdAt';
    }
  ): Observable<Transaction[]> | Observable<never> {
    let patch = '';
    if (query && query.transactionType) {
      patch += '?transactionType=' + query.transactionType;

      if (query.sortOrder) patch += '&sortOrder=' + query.sortOrder;
    } else if (query && query.sortOrder)
      patch += '?sortOrder=' + query.sortOrder;

    const url = `/api/users/${userId}/accounts/${accountId}/transactions${patch}`;

    const res = this.http.get<Transaction[]>(url).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(() => error);
      })
    );

    return res;
  }
}
