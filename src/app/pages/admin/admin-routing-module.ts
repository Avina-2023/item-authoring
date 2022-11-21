import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IsloggedInGuard } from 'src/app/guards/islogged-in.guard';
import { APP_CONSTANTS } from 'src/app/utils/app-constants.service';
import { JobslistComponent } from './jobslist/jobslist.component';
import { ViewjobComponent } from './viewjob/viewjob.component';

const routes: Routes = [
    {
        path: `${APP_CONSTANTS.ROUTES.ADMIN.JOBSLIST}`, component: JobslistComponent,
        data: {
            breadcrumb: 'JobsList'
        },
    },
    {
        path: `${APP_CONSTANTS.ROUTES.ADMIN.VIEWJOB}/:id`, component: ViewjobComponent,
        canActivate: [IsloggedInGuard],
        data: {
            breadcrumb: 'ViewJob'
        },
    },
    {
        path: '',
        redirectTo: `${APP_CONSTANTS.ROUTES.ADMIN.JOBSLIST}`,
        pathMatch: 'full',
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule { }
