import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { Account, Category, Transaction } from 'src/app/dashboard/models';
import { ReadTransactionComponent } from 'src/app/dashboard/dialogs/read-transaction/read-transaction.component';
import { User } from 'src/app/user';
import { Subscription } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { TransactionService } from 'src/app/dashboard/services/transaction.service';
@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss'],
})
export class TransactionComponent implements OnInit {
  @Input() transaction: Transaction | null = null;
  @Input() account: Account | null = null;
  @Input() user: User | null = null;
  @Input() symbol: string | null = null;

  @Output() deleteTransactionEvent = new EventEmitter<Transaction>();
  @Output() editTransactionEvent = new EventEmitter<Transaction>();

  categories: Category[] = [];

  constructor(
    public dialog: MatDialog,
    private transactionService: TransactionService
  ) {}

  sub: Subscription = new Subscription();

  ngOnInit() {
    this.sub.unsubscribe();

    const myObserver = {
      next: (res: Category[]) => {
        this.categories = res;
      },
      error: (err: HttpErrorResponse) => {
        console.error(err);
      },
    };

    if (!this.user || !this.transaction) return;

    this.sub = this.transactionService
      .getCategories(this.user._id, this.transaction.categories)
      .subscribe(myObserver);
  }

  openDialog() {
    const dialogRef = this.dialog.open(ReadTransactionComponent, {
      width: '520px',
      data: {
        user: this.user,
        account: this.account,
        transaction: this.transaction,
        editTransactionEvent: this.editTransactionEvent,
        deleteTransactionEvent: this.deleteTransactionEvent,
      },
    });

    dialogRef.afterClosed().subscribe((result): void => {});
  }
}
