import {
  Component,
  DoCheck,
  EventEmitter,
  Inject,
  OnInit,
} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { createMask } from '@ngneat/input-mask';

import { TransactionService } from '../../services/transaction.service';
import { Account, Category, ReturnType, Transaction } from '../../models';
import { User } from 'src/app/user';
import { map, startWith, Subscription } from 'rxjs';
import { EmptyArray } from '../shared/custom validators/empty-array';

interface Currency {
  _id: string;
  name: string;
  symbol: string;
}

interface DialogData {
  user: User;
  account: Account;
  transaction: Transaction;
  editTransactionEvent: EventEmitter<Transaction>;
}

@Component({
  selector: 'app-edit-transaction',
  templateUrl: './edit-transaction.component.html',
  styleUrls: ['./edit-transaction.component.scss'],
})
export class EditTransactionComponent implements OnInit, DoCheck {
  currencyInputMask = createMask({
    alias: 'numeric',
    groupSeparator: ',',
    digits: 2,
    digitsOptional: false,
    prefix: this.data.account.currency.symbol + ' ',
    placeholder: '0',
    parser: (value: string) => {
      const charArray = value.split('');

      const updated = charArray.filter(
        (value) =>
          value !== '$'[0] && value !== ' '[0] && value !== ',' && value !== '-'
      );

      const r = parseFloat(updated.join(''));

      return r;
    },
  });

  maxDate: Date;

  amount = new FormControl(
    this.data.transaction.amount < 0
      ? -1 * this.data.transaction.amount
      : this.data.transaction.amount,
    [Validators.required]
  );
  transactionType = new FormControl(this.data.transaction.type);
  oldTransactionType = this.data.transaction.type;
  title = new FormControl(this.data.transaction.title, [
    Validators.required,
    Validators.maxLength(128),
    Validators.pattern(/^(((\w|\d|\.|\s|,)*)(\w|\d|\s)$)$/),
  ]);
  categories = new FormControl([], [EmptyArray]);
  categoriesObj: Category[] = [];
  categoriesAll: string[] = [];
  date = new FormControl(
    new Date(this.data.transaction.receivalDate),
    Validators.required
  );
  payee = new FormControl(this.data.transaction.payee);
  description = new FormControl(this.data.transaction.description);

  constructor(
    private transactionService: TransactionService,
    public dialogRef: MatDialogRef<EditTransactionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    this.maxDate = new Date();
  }

  sub: Subscription = new Subscription();
  subCMany: Subscription = new Subscription();

  ngOnInit() {
    this.sub.unsubscribe();
    this.subCMany.unsubscribe();

    const myObserver = {
      next: (res: Category[]) => {
        this.categoriesAll = res.map((element) => element.title);
        this.categoriesObj = res;
      },
      error: (err: HttpErrorResponse) => {
        console.error(err);
      },
    };

    this.sub = this.transactionService
      .getCategoriesByType(this.data.user._id, this.transactionType.value)
      .subscribe(myObserver);

    this.subCMany = this.transactionService
      .getCategories(this.data.user._id, this.data.transaction.categories)
      .subscribe({
        next: (res: Category[]) => {
          if (this.data.transaction.type === this.transactionType.value)
            this.categories.setValue(res.map((element) => element.title));
          else this.categories.setValue([]);
        },
        error: (err: HttpErrorResponse) => {
          console.error(err);
        },
      });
  }

  ngDoCheck() {
    if (this.oldTransactionType !== this.transactionType.value) {
      this.oldTransactionType = this.transactionType.value;

      this.sub.unsubscribe();

      const myObserver = {
        next: (res: Category[]) => {
          this.categoriesAll = res.map((element) => element.title);
          this.categoriesObj = res;
        },
        error: (err: HttpErrorResponse) => {
          console.error(err);
        },
      };

      this.sub = this.transactionService
        .getCategoriesByType(this.data.user._id, this.transactionType.value)
        .subscribe(myObserver);

      this.subCMany.unsubscribe();
      this.subCMany = this.transactionService
        .getCategories(this.data.user._id, this.data.transaction.categories)
        .subscribe({
          next: (res: Category[]) => {
            if (this.data.transaction.type === this.transactionType.value)
              this.categories.setValue(res.map((element) => element.title));
            else this.categories.setValue([]);
          },
          error: (err: HttpErrorResponse) => {
            console.error(err);
          },
        });
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  allFruitsDeleteEvent(values: string[]) {
    this.categoriesAll = values;
  }

  allFruitsAddEvent(values: string[]) {
    this.categoriesAll = values;
  }

  getTitleErrorMessage() {
    if (this.title.hasError('required')) return 'Title is required';

    if (this.title.hasError('maxlength'))
      return 'Maximum number of characters reached';

    if (this.title.hasError('pattern'))
      return 'Title cannot contain special symbols and trailing dots';

    return '';
  }

  addCategory(category: string) {
    this.categories.value.push(category);
    /* this.categories.setValue([...this.categories.value]); */
    this.categories = new FormControl(this.categories.value, [EmptyArray]);
  }

  removeCategory(category: string) {
    const index = this.categories.value.indexOf(category);

    if (index >= 0) {
      this.categories.value.splice(index, 1);
      /* this.categories.setValue([...this.categories.value]); */
      this.categories = new FormControl(this.categories.value, [EmptyArray]);
    }
  }

  onClickSave(): void {
    const myCategories = this.categories.value.map((value: string) => {
      const aye = this.categoriesObj.find(
        (element) => element.title === value
      )?._id;

      if (aye) return aye;

      return '';
    });

    let amount = this.amount.value;

    if (this.transactionType.value === 'expense') {
      if (this.amount.value > 0) amount = -1 * this.amount.value;
    }

    const emitValue: Transaction = {
      _id: this.data.transaction._id,
      title: this.title.value,
      amount: amount,
      type: this.transactionType.value,
      categories: myCategories,
      receivalDate: this.date.value,
      payee: this.payee.value,
      description: this.description.value,
    };

    this.dialogRef.close(emitValue);
  }
}
