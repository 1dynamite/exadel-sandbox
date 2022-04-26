import { AbstractControl } from '@angular/forms';

export function EmptyArray(control: AbstractControl) {
  if (control.value.length === 0) {
    return { empty: true };
  }
  return null;
}
