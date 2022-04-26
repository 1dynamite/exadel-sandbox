import { Component, EventEmitter, Inject, Input } from '@angular/core';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialog,
} from '@angular/material/dialog';

import { EditAccountComponent } from '../../dialogs/edit-account/edit-account.component';
import { DeleteAccountComponent } from '../../dialogs/delete-account/delete-account.component';
import { User } from 'src/app/user';
import { Account } from '../../models';

interface DialogData {
  user: User;
  account: Account;
  editAccountEvent: EventEmitter<Account>;
  deleteAccountEvent: EventEmitter<Account>;
}

@Component({
  selector: 'app-read-account',
  templateUrl: './read-account.component.html',
  styleUrls: ['./read-account.component.scss'],
})
export class ReadAccountComponent {
  constructor(
    public dialogRef: MatDialogRef<ReadAccountComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public editDialog: MatDialog,
    public deleteDialog: MatDialog,
    public accountInfoDialog: MatDialog
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  openEditDialog() {
    this.dialogRef.close();

    const dialogRef = this.editDialog.open(EditAccountComponent, {
      width: '520px',
      data: {
        user: this.data.user,
        account: this.data.account,
      },
    });

    dialogRef.afterClosed().subscribe((result: Account): void => {
      if (!result) return;
      this.data.editAccountEvent.emit(result);

      if (result) {
        this.accountInfoDialog.open(ReadAccountComponent, {
          width: '520px',
          data: {
            user: this.data.user,
            account: this.data.account,
            editAccountEvent: this.data.editAccountEvent,
          },
        });
      }
    });
  }

  openDeleteDialog() {
    const dialogRef = this.editDialog.open(DeleteAccountComponent, {
      width: '420px',
      data: {
        user: this.data.user,
        account: this.data.account,
      },
    });

    dialogRef.afterClosed().subscribe((result: Account) => {
      if (!result) return;

      this.data.deleteAccountEvent.emit(result);

      this.onNoClick();
    });
  }
}
