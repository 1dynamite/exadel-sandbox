import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { User } from 'src/app/user';

import { ReadAccountComponent } from '../../dialogs/read-account/read-account.component';
import { Account } from '../../models';

@Component({
  selector: 'app-account-card',
  templateUrl: './account-card.component.html',
  styleUrls: ['./account-card.component.scss'],
})
export class AccountCardComponent {
  @Input() id: string = '';
  @Input() name: string = '';
  @Input() balance: string = '';
  @Input() symbol: string = '';

  @Input() selected: boolean = false;
  hoveredOn: boolean = false;

  @Output() clickEvent = new EventEmitter<Account>();

  @Output() editAccountEvent = new EventEmitter<Account>();
  @Output() deleteAccountEvent = new EventEmitter<Account>();

  @Input() user: User | null = null;
  @Input() account: Account | null = null;

  onMouseOver() {
    this.hoveredOn = true;
  }

  onMouseOut() {
    this.hoveredOn = false;
  }

  onClick() {
    if (this.account) this.clickEvent.emit(this.account);
  }

  constructor(public dialog: MatDialog) {}

  openDialog(): void {
    if (!this.user || !this.account) return;

    const dialogRef = this.dialog.open(ReadAccountComponent, {
      width: '520px',
      data: {
        user: this.user,
        account: this.account,
        editAccountEvent: this.editAccountEvent,
        deleteAccountEvent: this.deleteAccountEvent,
      },
    });

    dialogRef.afterClosed().subscribe((): void => {});
  }
}
