import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpErrorResponse } from '@angular/common/http';

import { AccountService } from '../../services/account.service';

import { Account, ReturnType } from '../../models';
import { User } from 'src/app/user';

interface Currency {
  _id: string;
  name: string;
  symbol: string;
}

interface DialogData {
  user: User;
  account: Account;
}

@Component({
  selector: 'app-edit-account',
  templateUrl: './edit-account.component.html',
  styleUrls: ['./edit-account.component.scss'],
})
export class EditAccountComponent implements OnInit {
  title: string = this.data.account.title;

  currencies: Currency[] | null = null;

  selected: string = this.data.account.currency._id;

  description: string = this.data.account.description;

  constructor(
    public dialogRef: MatDialogRef<EditAccountComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private accountService: AccountService
  ) {}

  ngOnInit() {
    const myObserver = {
      next: (res: { currencies: Currency[] }) => {
        this.currencies = res.currencies;
      },
      error: (err: HttpErrorResponse) => {
        console.error(err);
      },
    };

    this.accountService.getAllCurrencies().subscribe(myObserver);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onClickSave(): void {
    if (!this.currencies) return;

    const currency = this.currencies.find((elem) => elem._id === this.selected);

    if (currency === undefined) return;

    const data = {
      title: this.title,
      currency: currency,
      description: this.description,
    };

    if (this.data.user === null) return;
    if (this.data.account === null) return;

    const params = {
      userId: this.data.user._id,
      accountId: this.data.account._id,
    };

    const res = this.accountService.editAccount(params, data);

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
