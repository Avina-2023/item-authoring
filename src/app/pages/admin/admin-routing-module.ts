import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { APP_CONSTANTS } from 'src/app/utils/app-constants.service';
import { HomedashboardComponent } from './homedashboard/homedashboard.component';

const routes: Routes = [
    {
        path: `${APP_CONSTANTS.ROUTES.ADMIN.DASHBOARD}`, component: HomedashboardComponent,
    },
    {
        path: '',
        redirectTo: `${APP_CONSTANTS.ROUTES.ADMIN.DASHBOARD}`,
        pathMatch: 'full',
    }
]

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})
export class AdminRoutingModule { }
