import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { AppRoutingModule } from './app-routing.module';
import { LoginModule } from './login/login.module';
import { AppComponent } from './app.component';
import { AuthInterceptor } from './http-interceptors/auth-interceptor';
import { NotFoundComponent } from './not-found/not-found.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NavBarMainComponent } from './dashboard/components/nav-bar-main/nav-bar-main.component';
import { NavBarProfileComponent } from './dashboard/components/nav-bar-profile/nav-bar-profile.component';

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    DashboardComponent,
    NavBarMainComponent,
    NavBarProfileComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    LoginModule,
    MatIconModule,
    MatButtonModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
