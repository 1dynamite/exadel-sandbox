import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { createMask } from '@ngneat/input-mask';

import { AccountService } from '../../services/account.service';
import { Account, ReturnType } from '../../models';
import { User } from 'src/app/user';
import { map, startWith } from 'rxjs';

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
  selector: 'app-edit-transaction',
  templateUrl: './edit-transaction.component.html',
  styleUrls: ['./edit-transaction.component.scss'],
})
export class EditTransactionComponent implements OnInit {
  currencyInputMask = createMask({
    alias: 'numeric',
    groupSeparator: ',',
    digits: 2,
    digitsOptional: false,
    prefix: '$ ',
    placeholder: '0',
  });
  amount = new FormControl('');

  transactionType = new FormControl('expense');

  constructor(
    public dialogRef: MatDialogRef<EditTransactionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  ngOnInit() {
    console.log('Welcome!');
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onClickSave(): void {}
}
