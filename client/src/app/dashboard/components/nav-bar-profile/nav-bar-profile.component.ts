import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { LogoutConfirmationComponent } from '../../dialogs/logout-confirmation/logout-confirmation.component';

@Component({
  selector: 'app-nav-bar-profile',
  templateUrl: './nav-bar-profile.component.html',
  styleUrls: ['./nav-bar-profile.component.scss'],
})
export class NavBarProfileComponent implements OnChanges {
  @Input() firstName: string = '';
  @Input() dashboardClickToggle: boolean = true;

  @Output() logoutEvent = new EventEmitter<void>();

  menuOpen: boolean = false;

  constructor(public dialog: MatDialog) {}

  logout() {
    this.menuOpen = false;

    const dialogRef = this.dialog.open(LogoutConfirmationComponent, {
      width: '320px',
      data: {
        logoutEvent: this.logoutEvent,
      },
    });

    dialogRef.afterClosed().subscribe((): void => {});
  }

  toggleMenu(event: any) {
    event.stopPropagation();
    this.menuOpen = !this.menuOpen;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['dashboardClickToggle']) {
      this.menuOpen = false;
    }
  }
}
