import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { createMask } from '@ngneat/input-mask';

import { AccountService } from '../../services/account.service';
import { Account, Category, ReturnType, Transaction } from '../../models';
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
  transactionEvent: EventEmitter<Transaction>;
}

@Component({
  selector: 'app-add-transaction',
  templateUrl: './add-transaction.component.html',
  styleUrls: ['./add-transaction.component.scss'],
})
export class AddTransactionComponent implements OnInit {
  currencyInputMask = createMask({
    alias: 'numeric',
    groupSeparator: ',',
    digits: 2,
    digitsOptional: false,
    prefix: '$ ',
    placeholder: '0',
    parser: (value: string) => {
      const updated = value.replace('$', '');

      return parseFloat(updated);
    },
  });

  maxDate: Date;

  amount = new FormControl('');
  transactionType = new FormControl('expense');
  title = new FormControl('');
  categories: string[] = ['Housing'];
  date = new FormControl(new Date());
  payee = new FormControl('');
  description = new FormControl('');

  constructor(
    public dialogRef: MatDialogRef<AddTransactionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    this.maxDate = new Date();
  }

  ngOnInit() {
    console.log('Welcome!');
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  addCategory(category: string) {
    this.categories.push(category);
  }

  removeCategory(category: string) {
    const index = this.categories.indexOf(category);

    if (index >= 0) {
      this.categories.splice(index, 1);
    }
  }

  onClickSave(): void {
    const myCategories: Category[] = this.categories.map((value) => {
      return {
        type: this.transactionType.value,
        title: value,
      };
    });

    this.data.transactionEvent.emit({
      title: this.title.value,
      amount: this.amount.value,
      type: this.transactionType.value,
      categories: myCategories,
      receivalDate: this.date.value,
      payee: this.payee.value,
      description: this.description.value,
    });
  }
}
