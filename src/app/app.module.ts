
import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material/material.module';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './pages/login/login.component';
import { SharedModule } from './shared/shared.module';
import { IsloggedInGuard } from './guards/islogged-in.guard';
import { ForgotComponent } from './pages/forgot/forgot.component';
import { SetPasswordComponent } from './pages/set-password/set-password.component';
import { ToastrModule } from 'ngx-toastr';
import { LogoutGuard } from './guards/logout.guard';
import { AgGridModule } from 'ag-grid-angular';
import 'ag-grid-enterprise';
import { PagenotfoundComponent } from './pages/pagenotfound/pagenotfound.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ForgotComponent,
    SetPasswordComponent,
    PagenotfoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    RouterModule,
    HttpClientModule,
    SharedModule,
    AgGridModule,
    ToastrModule.forRoot(
      {
        timeOut: 3000,
        preventDuplicates: true,
        maxOpened: 1,
        autoDismiss: true,
        progressBar: true,
        progressAnimation: 'increasing',
        closeButton: true
      }
    ),
  ],

  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }, IsloggedInGuard, LogoutGuard],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class AppModule { }
