import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomedashboardComponent } from './homedashboard/homedashboard.component';
import { AdminRoutingModule } from './admin-routing-module';
import { CommonSidebarComponent } from 'src/app/shared/common-sidebar/common-sidebar.component';
import { SharedModule } from 'src/app/shared/shared.module';
@NgModule({
    declarations: [

    ],
    imports: [
        CommonModule,
        AdminRoutingModule,
        SharedModule
    ]
})
export class AdminModule { }
