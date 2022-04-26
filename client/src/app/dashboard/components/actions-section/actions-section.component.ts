import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { User } from 'src/app/user';

import { AddAccountComponent } from '../../dialogs/add-account/add-account.component';
import { AddTransactionComponent } from '../../dialogs/add-transaction/add-transaction.component';
import { Account, Transaction, Category } from '../../models';
import { ReadTransactionComponent } from '../../dialogs/read-transaction/read-transaction.component';
import { EditTransactionComponent } from '../../dialogs/edit-transaction/edit-transaction.component';
import { DeleteTransactionComponent } from '../../dialogs/delete-transaction/delete-transaction.component';

@Component({
  selector: 'app-actions-section',
  templateUrl: './actions-section.component.html',
  styleUrls: ['./actions-section.component.scss'],
})
export class ActionsSectionComponent {
  @Input() user: User | null = null;
  @Input() account: Account | null = null;

  @Output() newAccountEvent = new EventEmitter<Account>();
  @Output() newTransactionEvent = new EventEmitter<Transaction>();

  constructor(public dialog: MatDialog) {}

  openDialog(): void {
    if (this.user === null) return;

    const dialogRef = this.dialog.open(AddAccountComponent, {
      width: '520px',
      data: {
        user: this.user,
        account: this.account,
      },
    });

    dialogRef.afterClosed().subscribe((result): void => {
      if (!result) return;
      this.newAccountEvent.emit(result);
    });
  }

  openDialogTransaction() {
    const dialogRef = this.dialog.open(AddTransactionComponent, {
      width: '520px',
      data: {
        user: this.user,
        account: this.account,
        transactionEvent: this.newTransactionEvent,
      },
    });

    dialogRef.afterClosed().subscribe((result): void => {
      console.log('Closed!', result);
    });
  }
}
