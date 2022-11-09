import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { APP_CONSTANTS } from 'src/app/utils/app-constants.service';
import { HomedashboardComponent } from './homedashboard/homedashboard.component';
import { JobslistComponent } from './jobslist/jobslist.component';
import { ViewjobComponent } from './viewjob/viewjob.component';

const routes: Routes = [
    {
        path: `${APP_CONSTANTS.ROUTES.ADMIN.DASHBOARD}`, component: HomedashboardComponent,
    },

    {
        path: `${APP_CONSTANTS.ROUTES.ADMIN.JOBSLIST}`, component: JobslistComponent,
    },
    {
        path: `${APP_CONSTANTS.ROUTES.ADMIN.VIEWJOB}`, component: ViewjobComponent,
    },

    {
        path: '',
        redirectTo: `${APP_CONSTANTS.ROUTES.ADMIN.DASHBOARD}`,
        pathMatch: 'full',
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule { }
