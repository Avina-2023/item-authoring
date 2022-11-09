import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing-module';

import { SharedModule } from 'src/app/shared/shared.module';
import { JobslistComponent } from './jobslist/jobslist.component';
@NgModule({
    declarations: [
        JobslistComponent
    ],
    imports: [
        CommonModule,
        AdminRoutingModule,
        SharedModule,


    ]
})
export class AdminModule { }
