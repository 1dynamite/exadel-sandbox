import { Component, Input } from '@angular/core';
import { Transaction } from 'src/app/dashboard/models';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss'],
})
export class TransactionComponent {
  @Input() transaction: Transaction | null = null;
  @Input() symbol: string | null = null;

  constructor() {}
}
