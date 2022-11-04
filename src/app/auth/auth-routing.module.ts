import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { APP_CONSTANTS } from '../utils/app-constants.service';
import { AuthComponent } from './auth.component';
const routes: Routes = [
    {
        path: '', component: AuthComponent,
        children: [
            {
                path: `${APP_CONSTANTS.ROUTES.ADMIN.HOME}`, loadChildren: () => import('../pages/admin/admin-module').then(m => m.AdminModule)
            },
        ],
    }
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AuthRoutingModule { }