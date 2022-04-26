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
  transactionEvent: EventEmitter<Transaction>;
}

@Component({
  selector: 'app-add-transaction',
  templateUrl: './add-transaction.component.html',
  styleUrls: ['./add-transaction.component.scss'],
})
export class AddTransactionComponent implements DoCheck, OnInit {
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

  amount = new FormControl(0, [Validators.required]);
  transactionType = new FormControl('expense');
  oldTransactionType = 'income';
  title = new FormControl('', [
    Validators.required,
    Validators.maxLength(128),
    Validators.pattern(/^(((\w|\d|\.|\s|,)*)(\w|\d|\s)$)$/),
  ]);
  categories = new FormControl([], [EmptyArray]);
  categoriesObj: Category[] = [];
  categoriesAll: string[] = [];
  date = new FormControl(new Date(), Validators.required);
  payee = new FormControl('');
  description = new FormControl('');

  saveDisabled: boolean = true;

  constructor(
    private transactionService: TransactionService,
    public dialogRef: MatDialogRef<AddTransactionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    this.maxDate = new Date();

    this.title.statusChanges.subscribe((value) => {
      this.saveDisabled =
        value === 'INVALID' ||
        this.description.status === 'INVALID' ||
        this.categories.status === 'INVALID';
    });
    this.date.statusChanges.subscribe((value) => {
      this.saveDisabled =
        value === 'INVALID' ||
        this.title.status === 'INVALID' ||
        this.categories.status === 'INVALID';
    });
    this.categories.statusChanges.subscribe((value) => {
      this.saveDisabled =
        value === 'INVALID' ||
        this.description.status === 'INVALID' ||
        this.title.status === 'INVALID';
    });
  }

  sub: Subscription = new Subscription();
  subCMany: Subscription = new Subscription();

  ngOnInit() {
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

      this.categories.setValue([]);
    }
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

  onNoClick(): void {
    this.dialogRef.close();
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

    if (myCategories === undefined) return;

    this.data.transactionEvent.emit({
      title: this.title.value,
      amount: amount,
      type: this.transactionType.value,
      categories: myCategories,
      receivalDate: this.date.value,
      payee: this.payee.value,
      description: this.description.value,
    });

    this.onNoClick();
  }
}
