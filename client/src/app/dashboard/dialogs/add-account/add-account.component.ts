import { Component, Inject, OnInit } from '@angular/core';
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
  selector: 'app-add-account',
  templateUrl: './add-account.component.html',
  styleUrls: ['./add-account.component.scss'],
})
export class AddAccountComponent implements OnInit {
  title: string = '';

  currencies: Currency[] | null = null;

  selected: string = '';

  description: string = '';

  constructor(
    public dialogRef: MatDialogRef<AddAccountComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private accountService: AccountService
  ) {}

  ngOnInit() {
    const myObserver = {
      next: (res: { currencies: Currency[] }) => {
        this.currencies = res.currencies;
        this.selected = this.currencies[0]._id;
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

    if (data && this.data.user) {
      const res = this.accountService.addAccount(data, this.data.user._id);

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
}
