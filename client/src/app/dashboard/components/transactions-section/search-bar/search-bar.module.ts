import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedFormsModule } from 'src/app/shared/forms/forms.module';
import { SearchBarComponent } from './search-bar.component';

@NgModule({
  declarations: [SearchBarComponent],
  imports: [CommonModule, SharedFormsModule],
  exports: [SearchBarComponent],
})
export class SearchBarModule {}
