import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing-module';

import { SharedModule } from 'src/app/shared/shared.module';
import { JobslistComponent } from './jobslist/jobslist.component';
import { ViewjobComponent } from './viewjob/viewjob.component';
@NgModule({
    declarations: [
        JobslistComponent,
        ViewjobComponent
    ],
    imports: [
        CommonModule,
        AdminRoutingModule,
        SharedModule,

    ]
})
export class AdminModule { }
