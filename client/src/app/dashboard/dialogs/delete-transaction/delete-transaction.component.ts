import { Component, Inject, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpErrorResponse } from '@angular/common/http';

import { AccountService } from '../../services/account.service';
import { Account, ReturnType } from '../../models';
import { User } from 'src/app/user';

interface DialogData {
  user: User;
  account: Account;
}

@Component({
  selector: 'app-delete-transaction',
  templateUrl: './delete-transaction.component.html',
  styleUrls: ['./delete-transaction.component.scss'],
})
export class DeleteTransactionComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteTransactionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private accountService: AccountService
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onClickDelete(): void {
    if (!this.data.user || !this.data.account) return;

    const params = {
      userId: this.data.user._id,
      accountId: this.data.account._id,
    };

    const res = this.accountService.deleteAccount(params);

    const myObserver = {
      next: (res: ReturnType) => {
        this.dialogRef.close(res.account);
      },
      error: (err: HttpErrorResponse) => {
        console.error(err);
      },
    };

    res.subscribe(myObserver);
  }
}
