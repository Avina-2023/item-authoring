import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomedashboardComponent } from './dashboard/homedashboard/homedashboard.component';
import { ForgotPasswordComponent } from './login/forgot-password/forgot-password.component';
import { SignupComponent } from './login/signup/signup.component';


const routes: Routes = [
  {
    path: '', component: SignupComponent
  },
  {
    path: 'sign', component: SignupComponent
  },
  {
    path: 'forgot', component: ForgotPasswordComponent
  },
  {
    path: 'home', component: HomedashboardComponent
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
