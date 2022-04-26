import { Component, Inject, Input, OnInit } from '@angular/core';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialog,
} from '@angular/material/dialog';
import { HttpErrorResponse } from '@angular/common/http';

import { AccountService } from '../../services/account.service';
import { Account, ReturnType } from '../../models';
import { User } from 'src/app/user';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
import { SnackbarComponent } from '../shared/snackbar/snackbar.component';
import { CurrencyPopupComponent } from '../currency-popup/currency-popup.component';

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
  title = new FormControl(this.data.account.title, [
    Validators.required,
    Validators.maxLength(128),
    Validators.pattern(/^(((\w|\d|\.|\s|,)*)(\w|\d|\s)$)$/),
  ]);

  currencies = new FormControl([]);

  selected = new FormControl(this.data.account.currency._id);
  oldSelected = new FormControl(this.data.account.currency._id);

  description = new FormControl(this.data.account.description, [
    Validators.maxLength(256),
  ]);

  firstTimeChange: boolean = true;

  saveDisabled: boolean = true;

  constructor(
    public currencyPopupDialog: MatDialog,
    public dialogRef: MatDialogRef<EditAccountComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private accountService: AccountService,
    private _snackBar: MatSnackBar
  ) {
    this.title.statusChanges.subscribe((value) => {
      this.saveDisabled =
        value === 'INVALID' ||
        this.description.status === 'INVALID' ||
        this.currencies.status === 'INVALID';
    });
    this.description.statusChanges.subscribe((value) => {
      this.saveDisabled =
        value === 'INVALID' ||
        this.title.status === 'INVALID' ||
        this.currencies.status === 'INVALID';
    });
    this.selected.statusChanges.subscribe((value) => {
      this.saveDisabled =
        value === 'INVALID' ||
        this.description.status === 'INVALID' ||
        this.title.status === 'INVALID';
    });

    this.selected.valueChanges.subscribe((value) => {
      if (this.firstTimeChange) {
        this.openCurrencyDialog();
        this.firstTimeChange = false;
      } else {
        this.oldSelected.setValue(this.selected.value);
      }
    });
  }

  ngOnInit() {
    const myObserver = {
      next: (res: { currencies: Currency[] }) => {
        this.currencies.setValue(res.currencies);
      },
      error: (err: HttpErrorResponse) => {
        console.error(err);
      },
    };

    this.accountService.getAllCurrencies().subscribe(myObserver);
  }

  openCurrencyDialog() {
    const dialogRef = this.currencyPopupDialog.open(CurrencyPopupComponent, {
      width: '420px',
    });

    dialogRef.afterClosed().subscribe((result: true | undefined) => {
      if (result) this.oldSelected.setValue(this.selected.value);
      else {
        this.selected.setValue(this.oldSelected.value);
      }
    });
  }

  getTitleErrorMessage() {
    if (this.title.hasError('required')) return 'Title is required';

    if (this.title.hasError('maxlength'))
      return 'Maximum number of characters reached';

    if (this.title.hasError('pattern'))
      return 'Title cannot contain special symbols and trailing dots';

    if (this.title.hasError('notUnique'))
      return 'Account title should be unique';

    return '';
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  openSnackBar() {
    this._snackBar.openFromComponent(SnackbarComponent, {
      duration: 5000,
      panelClass: ['white-background-snackbar'],
      data: { message: 'The account successfully edited!' },
    });
  }

  onClickSave(): void {
    if (!this.currencies.value) return;

    const currency = this.currencies.value.find(
      (elem: Currency) => elem._id === this.selected.value
    );

    if (currency === undefined) return;

    const data = {
      title: this.title.value,
      currency: currency,
      description: this.description.value,
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
        this.openSnackBar();
      },
      error: (err: HttpErrorResponse) => {
        this.title.setErrors({ notUnique: true });
      },
    };

    res.subscribe(myObserver);
  }
}
