
import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginpageComponent } from './login/loginpage/loginpage.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material/material.module';
import { HomedashboardComponent } from './dashboard/homedashboard/homedashboard.component';
import { CommonSidebarComponent } from './shared/common-sidebar/common-sidebar.component';
import { DashboardHeaderComponent } from './shared/dashboard-header/dashboard-header.component';
import { RouterModule } from '@angular/router';
import { ForgotPasswordComponent } from './login/forgot-password/forgot-password.component';
import { HttpClientModule } from '@angular/common/http';
import { IsAccessGuard } from './guards/is-access.guard';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FooterComponent } from './shared/footer/footer.component';
import { LogpageComponent } from './login/logpage/logpage.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginpageComponent,
    HomedashboardComponent,
    CommonSidebarComponent,
    DashboardHeaderComponent,
    ForgotPasswordComponent,
    FooterComponent,
    LogpageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    RouterModule,
    MatToolbarModule,
    HttpClientModule
  ],
  providers: [IsAccessGuard],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class AppModule { }
