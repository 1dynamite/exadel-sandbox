import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddAccountComponent } from './add-account/add-account.component';
import { SharedFormsModule } from 'src/app/shared/forms/forms.module';
import { MatDialogModule } from '@angular/material/dialog';
import { ReadAccountComponent } from './read-account/read-account.component';
import { EditAccountComponent } from './edit-account/edit-account.component';
import { DeleteAccountComponent } from './delete-account/delete-account.component';
import { AddTransactionComponent } from './add-transaction/add-transaction.component';
import { ChipsAutocompleteComponent } from './add-transaction/chips-autocomplete/chips-autocomplete.component';
import { MatChipsModule } from '@angular/material/chips';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { ReadTransactionComponent } from './read-transaction/read-transaction.component';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { InputMaskModule } from '@ngneat/input-mask';
import { EditTransactionComponent } from './edit-transaction/edit-transaction.component';
import { DeleteTransactionComponent } from './delete-transaction/delete-transaction.component';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { LogoutConfirmationComponent } from './logout-confirmation/logout-confirmation.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SnackbarComponent } from './shared/snackbar/snackbar.component';
import { CurrencyPopupComponent } from './currency-popup/currency-popup.component';

@NgModule({
  declarations: [
    AddAccountComponent,
    ReadAccountComponent,
    EditAccountComponent,
    DeleteAccountComponent,
    AddTransactionComponent,
    ChipsAutocompleteComponent,
    ReadTransactionComponent,
    EditTransactionComponent,
    DeleteTransactionComponent,
    LogoutConfirmationComponent,
    SnackbarComponent,
    CurrencyPopupComponent,
  ],
  imports: [
    CommonModule,
    SharedFormsModule,
    MatDialogModule,
    MatChipsModule,
    MatDatepickerModule,
    MatMomentDateModule,
    MatButtonToggleModule,
    InputMaskModule,
    MatTooltipModule,
    MatSnackBarModule,
  ],
  exports: [AddAccountComponent],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'en-GB' }],
})
export class DialogsModule {}
