import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginpageComponent } from './login/loginpage/loginpage.component';
import { SignupComponent } from './login/signup/signup.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material/material.module';
import { HomedashboardComponent } from './dashboard/homedashboard/homedashboard.component';
import { CommonSidebarComponent } from './shared/common-sidebar/common-sidebar.component';
import { DashboardHeaderComponent } from './shared/dashboard-header/dashboard-header.component';
import { RouterModule } from '@angular/router';
import { ForgotPasswordComponent } from './login/forgot-password/forgot-password.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    LoginpageComponent,
    SignupComponent,
    HomedashboardComponent,
    CommonSidebarComponent,
    DashboardHeaderComponent,
    ForgotPasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    RouterModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
