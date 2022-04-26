import { Component, EventEmitter, Inject, Input, OnInit } from '@angular/core';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialog,
} from '@angular/material/dialog';

import { User } from 'src/app/user';
import { Account, Category, Transaction } from '../../models';
import { EditTransactionComponent } from '../edit-transaction/edit-transaction.component';
import { DeleteTransactionComponent } from '../delete-transaction/delete-transaction.component';
import { Subscription } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { TransactionService } from '../../services/transaction.service';

interface DialogData {
  user: User;
  account: Account;
  transaction: Transaction;
  editTransactionEvent: EventEmitter<Transaction>;
  deleteTransactionEvent: EventEmitter<Transaction>;
}

@Component({
  selector: 'app-read-transaction',
  templateUrl: './read-transaction.component.html',
  styleUrls: ['./read-transaction.component.scss'],
})
export class ReadTransactionComponent implements OnInit {
  constructor(
    private transactionService: TransactionService,
    public dialogRef: MatDialogRef<ReadTransactionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public editDialog: MatDialog,
    public deleteDialog: MatDialog,
    public accountInfoDialog: MatDialog
  ) {}

  categories: string[] = [];

  sub: Subscription = new Subscription();
  ngOnInit() {
    this.sub.unsubscribe();

    const myObserver = {
      next: (res: Category[]) => {
        this.categories = res.map((element) => element.title);
      },
      error: (err: HttpErrorResponse) => {
        console.error(err);
      },
    };

    this.sub = this.transactionService
      .getCategories(this.data.user._id, this.data.transaction.categories)
      .subscribe(myObserver);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  openEditDialog() {
    this.dialogRef.close();

    const dialogRef = this.editDialog.open(EditTransactionComponent, {
      width: '520px',
      data: {
        user: this.data.user,
        account: this.data.account,
        transaction: this.data.transaction,
        editTransactionEvent: this.data.editTransactionEvent,
      },
    });

    dialogRef.afterClosed().subscribe((result: Transaction): void => {
      if (!result) return;
      this.data.editTransactionEvent.emit(result);

      this.accountInfoDialog.open(ReadTransactionComponent, {
        width: '520px',
        data: {
          user: this.data.user,
          account: this.data.account,
          transaction: result,
          editTransactionEvent: this.data.editTransactionEvent,
          deleteTransactionEvent: this.data.deleteTransactionEvent,
        },
      });
    });
  }

  openDeleteDialog() {
    const dialogRef = this.editDialog.open(DeleteTransactionComponent, {
      width: '420px',
      data: {
        user: this.data.user,
        account: this.data.account,
        transaction: this.data.transaction,
        deleteTransactionEvent: this.data.deleteTransactionEvent,
      },
    });

    dialogRef.afterClosed().subscribe((result: Transaction) => {
      if (!result) return;

      this.data.deleteTransactionEvent.emit(result);

      this.onNoClick();
    });
  }
}
