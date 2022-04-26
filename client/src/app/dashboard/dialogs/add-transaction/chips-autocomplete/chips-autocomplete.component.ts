import { COMMA, ENTER } from '@angular/cdk/keycodes';
import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable, of } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Category } from 'src/app/dashboard/models';
import { MatChipList } from '@angular/material/chips';

@Component({
  selector: 'app-chips-autocomplete',
  templateUrl: './chips-autocomplete.component.html',
  styleUrls: ['./chips-autocomplete.component.scss'],
})
export class ChipsAutocompleteComponent implements OnChanges {
  separatorKeysCodes: number[] = [ENTER, COMMA];
  fruitCtrl = new FormControl('', [Validators.required]);
  filteredFruits: Observable<string[]>;

  @Input() fruits = new FormControl([]);

  @Output() addFruitEvent = new EventEmitter<string>();
  @Output() removeFruitEvent = new EventEmitter<string>();

  @Input() allFruits: string[] = [];
  @Output() allFruitsAddEvent = new EventEmitter<string[]>();
  @Output() allFruitsDeleteEvent = new EventEmitter<string[]>();

  @ViewChild('fruitInput')
  fruitInput!: ElementRef<HTMLInputElement>;

  @ViewChild('chipList') chipList: any;

  constructor() {
    this.filteredFruits = this.fruitCtrl.valueChanges.pipe(
      startWith(null),
      map((fruit: string | null) => {
        return fruit ? this._filter(fruit) : this.allFruits.slice();
      })
    );
  }

  onChipBlur() {
    if (this.chipList) this.chipList.errorState = this.fruits.invalid;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['allFruits']) {
      this.filteredFruits = this.fruitCtrl.valueChanges.pipe(
        startWith(null),
        map((fruit: string | null) => {
          return fruit ? this._filter(fruit) : this.allFruits.slice();
        })
      );
    }

    if (changes['fruits']) {
      if (this.chipList) this.chipList.errorState = this.fruits.invalid;
    }
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.addFruitEvent.emit(value);
    }

    // Clear the input value
    event.chipInput!.clear();

    this.fruitCtrl.setValue(null);
  }

  remove(category: string): void {
    this.removeFruitEvent.emit(category);

    const newAllFruits = [...this.allFruits];
    newAllFruits.push(category);
    this.allFruitsAddEvent.emit(newAllFruits);
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.addFruitEvent.emit(event.option.viewValue);

    let newAllFruits = [...this.allFruits];

    newAllFruits = newAllFruits.filter(
      (element) => element !== event.option.viewValue
    );
    this.allFruitsDeleteEvent.emit(newAllFruits);

    this.fruitInput.nativeElement.value = '';
    this.fruitCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allFruits.filter((fruit) =>
      fruit.toLowerCase().includes(filterValue)
    );
  }
}
