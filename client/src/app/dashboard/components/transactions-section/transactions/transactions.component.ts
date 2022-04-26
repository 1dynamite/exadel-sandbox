import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Account, Transaction } from 'src/app/dashboard/models';
import { User } from 'src/app/user';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss'],
})
export class TransactionsComponent {
  @Input() symbol: string | null = null;

  @Input() transactions: Transaction[] | null = null;
  @Input() account: Account | null = null;
  @Input() user: User | null = null;

  @Output() deleteTransactionEvent = new EventEmitter<Transaction>();
  @Output() editTransactionEvent = new EventEmitter<Transaction>();

  constructor() {}

  onEdit(value: Transaction) {
    this.editTransactionEvent.emit(value);
  }

  onDelete(value: Transaction) {
    this.deleteTransactionEvent.emit(value);
  }
}
