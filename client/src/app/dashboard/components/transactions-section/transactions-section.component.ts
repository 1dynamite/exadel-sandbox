import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from 'src/app/user';
import { Account, Transaction } from '../../models';

@Component({
  selector: 'app-transactions-section',
  templateUrl: './transactions-section.component.html',
  styleUrls: ['./transactions-section.component.scss'],
})
export class TransactionsSectionComponent {
  @Input() symbol: string | null = null;
  @Input() transactions: Transaction[] | null = null;
  @Input() account: Account | null = null;
  @Input() user: User | null = null;

  @Output() deleteTransactionEvent = new EventEmitter<Transaction>();
  @Output() editTransactionEvent = new EventEmitter<Transaction>();

  @Input() filterSelected: 'expense' | 'income' | null = null;
  @Input() sortSelected: 'receivalDate' | 'createdAt' = 'receivalDate';

  @Output() filterSelectedEvent = new EventEmitter<
    'expense' | 'income' | null
  >();
  @Output() sortSelectedEvent = new EventEmitter<
    'receivalDate' | 'createdAt'
  >();

  constructor() {}

  onFilterClick(value: 'expense' | 'income' | null) {
    if (this.filterSelected === value) this.filterSelectedEvent.emit(null);
    else this.filterSelectedEvent.emit(value);
  }

  onSortClick(value: 'receivalDate' | 'createdAt') {
    this.sortSelectedEvent.emit(value);
  }

  onEdit(value: Transaction) {
    this.editTransactionEvent.emit(value);
  }

  onDelete(value: Transaction) {
    this.deleteTransactionEvent.emit(value);
  }
}
