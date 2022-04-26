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
  selector: 'app-currency-popup',
  templateUrl: './currency-popup.component.html',
  styleUrls: ['./currency-popup.component.scss'],
})
export class CurrencyPopupComponent {
  constructor(
    public dialogRef: MatDialogRef<CurrencyPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private accountService: AccountService
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onClickYes(): void {
    this.dialogRef.close(true);
  }
}
