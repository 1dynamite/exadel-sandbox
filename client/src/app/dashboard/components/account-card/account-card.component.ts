import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-account-card',
  templateUrl: './account-card.component.html',
  styleUrls: ['./account-card.component.scss'],
})
export class AccountCardComponent {
  @Input() name: string = '';
  @Input() balance: string = '';
  @Input() symbol: string = '';

  @Input() selected: boolean = false;
  hoveredOn: boolean = false;

  onMouseOver() {
    this.hoveredOn = true;
  }

  onMouseOut() {
    this.hoveredOn = false;
  }

  constructor() {}
}
