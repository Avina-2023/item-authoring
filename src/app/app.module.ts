
import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material/material.module';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { IsAccessGuard } from './guards/is-access.guard';
import { LoginComponent } from './pages/login/login.component';
import { SharedModule } from './shared/shared.module';
import { IsloggedInGuard } from './guards/islogged-in.guard';
import { ForgotComponent } from './pages/forgot/forgot.component';
import { SetPasswordComponent } from './pages/set-password/set-password.component';
import { ToastrModule } from 'ngx-toastr';
import { JobslistComponent } from './pages/admin/jobslist/jobslist.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ForgotComponent,
    SetPasswordComponent,


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

  providers: [IsAccessGuard, IsloggedInGuard],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class AppModule { }
