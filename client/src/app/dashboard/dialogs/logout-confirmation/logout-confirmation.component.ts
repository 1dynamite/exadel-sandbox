import { Component, EventEmitter, Inject, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpErrorResponse } from '@angular/common/http';

import { AccountService } from '../../services/account.service';
import { Account, ReturnType } from '../../models';
import { User } from 'src/app/user';

interface DialogData {
  logoutEvent: EventEmitter<void>;
}

@Component({
  selector: 'app-logout-confirmation',
  templateUrl: './logout-confirmation.component.html',
  styleUrls: ['./logout-confirmation.component.scss'],
})
export class LogoutConfirmationComponent {
  constructor(
    public dialogRef: MatDialogRef<LogoutConfirmationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private accountService: AccountService
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onClickDelete(): void {
    this.data.logoutEvent.emit();
    this.onNoClick();
  }
}
