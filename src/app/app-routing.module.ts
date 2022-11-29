import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IsloggedInGuard } from './guards/islogged-in.guard';
import { LogoutGuard } from './guards/logout.guard';
import { ForgotComponent } from './pages/forgot/forgot.component';
import { LoginComponent } from './pages/login/login.component';
import { PagenotfoundComponent } from './pages/pagenotfound/pagenotfound.component';
import { SetPasswordComponent } from './pages/set-password/set-password.component';
import { APP_CONSTANTS } from './utils/app-constants.service';

const routes: Routes = [
  {
    path: `${APP_CONSTANTS.ENDPOINTS.LOGIN}`, component: LoginComponent, canActivate: [IsloggedInGuard]
  },
  {
    path: 'forgot', component: ForgotComponent
  },
  {
    path: 'setpass', component: SetPasswordComponent
  },
  {
    path: `${APP_CONSTANTS.ROUTES.AUTH}`, loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule), canActivate: [LogoutGuard]
  },
  {
    path: '',
    pathMatch: 'full',
    component: LoginComponent, canActivate: [IsloggedInGuard]
  },
  {
    path: `error`,
    pathMatch: 'full',
    component: PagenotfoundComponent
  },
  {
    path: `**`,
    pathMatch: 'full',
    component: PagenotfoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
