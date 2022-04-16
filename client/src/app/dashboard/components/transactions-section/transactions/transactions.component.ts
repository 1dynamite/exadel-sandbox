import { Component, Input } from '@angular/core';
import { Transaction } from 'src/app/dashboard/models';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss'],
})
export class TransactionsComponent {
  @Input() symbol: string | null = null;

  @Input() transactions: Transaction[] | null = null;

  constructor() {}
}
