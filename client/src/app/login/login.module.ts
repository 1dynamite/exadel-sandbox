import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedFormsModule } from '../shared/forms/forms.module';
import { LoginComponent } from './login.component';

@NgModule({
  declarations: [LoginComponent],
  imports: [CommonModule, SharedFormsModule],
  exports: [LoginComponent],
})
export class LoginModule {}
