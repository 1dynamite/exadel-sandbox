import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-symbol',
  templateUrl: './symbol.component.html',
  styleUrls: ['./symbol.component.scss'],
})
export class SymbolComponent {
  @Input() symbol: string = '';

  constructor() {}
}
