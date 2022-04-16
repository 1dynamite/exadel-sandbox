import { Component, Input } from '@angular/core';
import { Transaction } from '../../models';

@Component({
  selector: 'app-transactions-section',
  templateUrl: './transactions-section.component.html',
  styleUrls: ['./transactions-section.component.scss'],
})
export class TransactionsSectionComponent {
  @Input() symbol: string | null = null;
  @Input() transactions: Transaction[] | null = null;

  constructor() {}
}
