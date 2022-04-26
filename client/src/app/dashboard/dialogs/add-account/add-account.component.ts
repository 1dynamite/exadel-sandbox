import {
  Component,
  DoCheck,
  EventEmitter,
  Inject,
  OnInit,
} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpErrorResponse } from '@angular/common/http';

import { AccountService } from '../../services/account.service';
import { Account, ReturnType } from '../../models';
import { User } from 'src/app/user';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
import { SnackbarComponent } from '../shared/snackbar/snackbar.component';

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
  title = new FormControl('', [
    Validators.required,
    Validators.maxLength(128),
    Validators.pattern(/^(((\w|\d|\.|\s|,)*)(\w|\d|\s)$)$/),
  ]);

  currencies = new FormControl([]);

  selected = new FormControl('');

  description = new FormControl('', [Validators.maxLength(256)]);

  saveDisabled: boolean = true;

  constructor(
    public dialogRef: MatDialogRef<AddAccountComponent>,
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
    this.currencies.statusChanges.subscribe((value) => {
      this.saveDisabled =
        value === 'INVALID' ||
        this.description.status === 'INVALID' ||
        this.title.status === 'INVALID';
    });
  }

  ngOnInit() {
    const myObserver = {
      next: (res: { currencies: Currency[] }) => {
        this.currencies.setValue(res.currencies);
        this.selected.setValue(this.currencies.value[0]._id);
      },
      error: (err: HttpErrorResponse) => {
        console.error(err);
      },
    };

    this.accountService.getAllCurrencies().subscribe(myObserver);
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
      data: { message: 'The account created!' },
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

    if (data && this.data.user) {
      const res = this.accountService.addAccount(data, this.data.user._id);

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
}
