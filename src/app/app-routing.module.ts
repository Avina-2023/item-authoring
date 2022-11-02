import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomedashboardComponent } from './dashboard/homedashboard/homedashboard.component';
import { IsAccessGuard } from './guards/is-access.guard';
import { LogpageComponent } from './login/logpage/logpage.component';

const routes: Routes = [
  {
    path: '', component: LogpageComponent
  },
  {
    path: 'home', component: HomedashboardComponent
  },
  {
    path: '/login',
    loadChildren: () => import('./login/login-routing/login-routing.module').then(m => m.LoginRoutingModule), canActivate: [IsAccessGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
