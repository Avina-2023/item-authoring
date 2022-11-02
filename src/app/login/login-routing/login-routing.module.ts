import { APP_CONSTANTS } from './../../utils/app-constants.service';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ForgotPasswordComponent } from '../forgot-password/forgot-password.component';
import { LogpageComponent } from '../logpage/logpage.component';
const routes: Routes = [
  {
    path: ``, redirectTo: `${APP_CONSTANTS.ROUTES.lOGPAGE}`
  },
  {
    path: `${APP_CONSTANTS.ROUTES.lOGPAGE}`, component: LogpageComponent
  },
  {
    path: `${APP_CONSTANTS.ROUTES.FORGOT}`, component: ForgotPasswordComponent
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class LoginRoutingModule { }
