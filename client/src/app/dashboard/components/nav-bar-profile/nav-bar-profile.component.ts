import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-nav-bar-profile',
  templateUrl: './nav-bar-profile.component.html',
  styleUrls: ['./nav-bar-profile.component.scss'],
})
export class NavBarProfileComponent {
  @Input() firstName: string = '';

  constructor() {}
}
