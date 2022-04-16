import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { User } from '../user';
import { Account, Transaction } from './models';

import { DashboardService } from './dashboard.service';
import { TransactionsService } from './components/transactions-section/transactions/transactions.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  user: User | undefined;
  selectedAccount: Account | null = null;

  transactions: Transaction[] = [
    {
      _id: 'transaction-id-1',
      type: 'expense',
      title: 'Title-1',
      receivalDate: 'Date-1',
      categories: [
        {
          _id: 'Category-id-1',
          title: 'Category-title-1',
          type: 'expense',
        },
      ],
      payee: 'John Smith',
      amount: 123,
      description: 'Description-1',
    },
    {
      payee: 'John Smith',
      _id: 'transaction-id-2',
      type: 'expense',
      title: 'Title-2',
      receivalDate: 'Date-2',
      categories: [
        {
          _id: 'Category-id-2',
          title: 'Category-title-2',
          type: 'expense',
        },
      ],
      amount: 123,
      description: 'Description-2',
    },
    {
      payee: 'John Smith',
      _id: 'transaction-id-3',
      type: 'income',
      title: 'Title-3',
      receivalDate: 'Date-3',
      categories: [
        {
          _id: 'Category-id-3',
          title: 'Category-title-3',
          type: 'expense',
        },
      ],
      amount: 123,
      description: 'Description-3',
    },
  ];

  sub: Subscription = new Subscription();

  constructor(
    private router: Router,
    private dashboardService: DashboardService,
    private transactionService: TransactionsService
  ) {
    this.user = this.router.getCurrentNavigation()?.extras.state?.['user'];
    this.selectedAccount = this.user?.accounts[0] ?? null;
  }

  ngOnInit(): void {
    const myObserver = {
      next: (res: User) => {
        this.user = res;
        this.selectedAccount = this.user?.accounts[0] ?? null;

        /* this.sub.unsubscribe();

        const myObserver = {
          next: (res: Transaction[]) => {
            this.transactions = res;
          },
          error: (err: HttpErrorResponse) => {
            console.error(err);
          },
        };

        if (!this.user) return;
        if (!this.selectedAccount) return;
        this.sub = this.transactionService
          .getTransactions(this.user._id, this.selectedAccount._id)
          .subscribe(myObserver); */
      },
      error: (err: HttpErrorResponse) => {
        console.error(err);
        this.router.navigateByUrl('/login');
      },
    };

    if (!this.user) this.dashboardService.getUser().subscribe(myObserver);
  }

  logout(): void {
    localStorage.clear();
  }

  onClickCard(account: Account) {
    this.selectedAccount = account;
  }

  addAccount(account: Account) {
    this.selectedAccount = account;

    this.user?.accounts.push(account);
  }

  editAccount(account: Account) {
    if (!this.selectedAccount) return;

    this.selectedAccount.title = account.title;
    this.selectedAccount.description = account.description;
    this.selectedAccount.currency = account.currency;
  }

  deleteAccount(account: Account) {
    if (!this.user) return;

    this.selectedAccount = this.user.accounts[0] ?? null;

    this.user.accounts = this.user.accounts.filter(
      (element: Account) => element._id !== account._id
    );
  }

  addTransaction(value: Transaction) {
    this.transactions.push(value);
  }
}
