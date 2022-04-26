import { HttpErrorResponse } from '@angular/common/http';
import {
  AfterViewInit,
  Component,
  DoCheck,
  ElementRef,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { User } from '../user';
import { Account, Transaction } from './models';

import { DashboardService } from './dashboard.service';
import { TransactionsService } from './components/transactions-section/transactions/transactions.service';
import { TransactionService } from './services/transaction.service';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
import { SnackbarComponent } from './dialogs/shared/snackbar/snackbar.component';

import { NavBarProfileComponent } from 'src/app/dashboard/components/nav-bar-profile/nav-bar-profile.component';

interface ServerResponseType {
  message: string;
  body: Transaction;
  accountBalance: number;
}
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, DoCheck {
  user: User | undefined;
  selectedAccount: Account | null = null;
  oldSelectedAccount: Account | null = null;

  transactions: Transaction[] = [];

  sub: Subscription = new Subscription();

  dashboardClickToggle: boolean = false;

  filterSelected: 'expense' | 'income' | null = null;
  sortSelected: 'receivalDate' | 'createdAt' = 'receivalDate';
  oldFilterSelected: 'expense' | 'income' | null = null;
  oldSortSelected: 'receivalDate' | 'createdAt' = 'receivalDate';

  constructor(
    private router: Router,
    private dashboardService: DashboardService,
    private transactionService: TransactionsService,
    private transService: TransactionService,
    private _snackBar: MatSnackBar
  ) {
    this.user = this.router.getCurrentNavigation()?.extras.state?.['user'];
    this.selectedAccount = this.user?.accounts[0] ?? null;
  }

  ngOnInit(): void {
    const myObserver = {
      next: (res: User) => {
        this.user = res;
        this.selectedAccount = this.user?.accounts[0] ?? null;
      },
      error: (err: HttpErrorResponse) => {
        this.router.navigateByUrl('/login');
      },
    };

    if (!this.user) this.dashboardService.getUser().subscribe(myObserver);
  }

  subFtr: Subscription = new Subscription();
  subSort: Subscription = new Subscription();

  ngDoCheck() {
    if (this.oldSelectedAccount !== this.selectedAccount) {
      this.oldSelectedAccount = this.selectedAccount;

      this.sub.unsubscribe();

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
        .subscribe(myObserver);
    }

    if (this.oldFilterSelected !== this.filterSelected) {
      this.oldFilterSelected = this.filterSelected;
      this.subFtr.unsubscribe();

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
      this.subFtr = this.transactionService
        .getTransactions(this.user._id, this.selectedAccount._id, {
          transactionType: this.filterSelected,
          sortOrder: this.sortSelected,
        })
        .subscribe(myObserver);
    }

    if (this.oldSortSelected !== this.sortSelected) {
      this.oldSortSelected = this.sortSelected;
      this.subSort.unsubscribe();

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
      this.subSort = this.transactionService
        .getTransactions(this.user._id, this.selectedAccount._id, {
          transactionType: this.filterSelected,
          sortOrder: this.sortSelected,
        })
        .subscribe(myObserver);
    }
  }

  onFilterClick(value: 'expense' | 'income' | null) {
    this.filterSelected = value;
  }

  onSortClick(value: 'receivalDate' | 'createdAt') {
    this.sortSelected = value;
  }

  onDashboardClick(event: any) {
    const navBarProfile = document.getElementById('navBarProfile');

    if (!navBarProfile) return;

    if (!navBarProfile.contains(event.target)) {
      this.dashboardClickToggle = !this.dashboardClickToggle;
    }
  }

  logout(): void {
    localStorage.clear();
    this.router.navigateByUrl('/login');
  }

  onClickCard(account: Account) {
    this.selectedAccount = account;
  }

  openSnackBar() {
    this._snackBar.openFromComponent(SnackbarComponent, {
      duration: 5000,
      panelClass: ['white-background-snackbar'],
      data: { message: 'The transaction created!' },
    });
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

    this.selectedAccount = null;
  }

  addTransaction(value: Transaction) {
    if (!this.user || !this.selectedAccount) return;

    this.transService
      .addTransaction(this.user._id, this.selectedAccount._id, value)
      .subscribe({
        next: (res: ServerResponseType) => {
          this.openSnackBar();
          /* this.transactions.push(res.body); */
          if (this.selectedAccount === null) return;
          this.selectedAccount.balance = res.accountBalance;
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
          this.subSort = this.transactionService
            .getTransactions(this.user._id, this.selectedAccount._id, {
              transactionType: this.filterSelected,
              sortOrder: this.sortSelected,
            })
            .subscribe(myObserver);
        },
      });
  }

  editTransaction(value: Transaction) {
    if (!this.user || !this.selectedAccount || !value._id) return;

    this.transService
      .editTransaction(
        this.user._id,
        this.selectedAccount._id,
        value._id,
        value
      )
      .subscribe({
        next: (res: ServerResponseType) => {
          const index = this.transactions?.findIndex(
            (element) => element._id === res.body._id
          );

          if (index === -1 || !this.transactions) return;

          this.transactions[index] = {
            ...this.transactions[index],
            ...res.body,
          };

          if (this.selectedAccount)
            this.selectedAccount.balance = res.accountBalance;
        },
      });
  }

  deleteTransaction(value: Transaction) {
    if (!this.user || !this.selectedAccount || !value._id) return;

    this.transService
      .deleteTransaction(this.user._id, this.selectedAccount._id, value._id)
      .subscribe({
        next: (res: ServerResponseType) => {
          const index = this.transactions?.findIndex(
            (element) => element._id === res.body._id
          );

          if (index === -1 || !this.transactions) return;

          this.transactions.splice(index, 1);

          if (this.selectedAccount === null) return;
          this.selectedAccount.balance = res.accountBalance;
        },
      });
  }
}
