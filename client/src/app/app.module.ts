import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';

import { AppRoutingModule } from './app-routing.module';
import { LoginModule } from './login/login.module';
import { AppComponent } from './app.component';
import { AuthInterceptor } from './http-interceptors/auth-interceptor';
import { NotFoundComponent } from './not-found/not-found.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NavBarMainComponent } from './dashboard/components/nav-bar-main/nav-bar-main.component';
import { NavBarProfileComponent } from './dashboard/components/nav-bar-profile/nav-bar-profile.component';
import { AccountCardComponent } from './dashboard/components/account-card/account-card.component';
import { SymbolComponent } from './dashboard/components/account-card/symbol/symbol.component';
import { TransactionsSectionComponent } from './dashboard/components/transactions-section/transactions-section.component';
import { TransactionsComponent } from './dashboard/components/transactions-section/transactions/transactions.component';
import { SearchBarModule } from './dashboard/components/transactions-section/search-bar/search-bar.module';
import { TransactionComponent } from './dashboard/components/transactions-section/transactions/transaction/transaction.component';
import { ActionsSectionComponent } from './dashboard/components/actions-section/actions-section.component';
import { PiggybankComponent } from './dashboard/components/actions-section/piggybank/piggybank.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { DialogsModule } from './dashboard/dialogs/dialogs.module';
@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    DashboardComponent,
    NavBarMainComponent,
    NavBarProfileComponent,
    AccountCardComponent,
    SymbolComponent,
    TransactionsSectionComponent,
    TransactionsComponent,
    TransactionComponent,
    ActionsSectionComponent,
    PiggybankComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    LoginModule,
    SearchBarModule,
    MatIconModule,
    MatButtonModule,
    MatProgressBarModule,
    DialogsModule,
    MatTooltipModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
