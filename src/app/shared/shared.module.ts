
import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommonSidebarComponent } from './common-sidebar/common-sidebar.component';
import { DashboardHeaderComponent } from './dashboard-header/dashboard-header.component';
import { AdminModule } from '../pages/admin/admin-module';
import { FooterComponent } from './footer/footer.component';
import { LogincommonsideComponent } from './logincommonside/logincommonside.component';
import { MaterialModule } from '../material/material/material.module';
import { BreadcrumComponent } from './breadcrum/breadcrum.component';
import { CommonuploadComponent } from './commonupload/commonupload.component';
@NgModule({
    declarations: [
        DashboardHeaderComponent,
        CommonSidebarComponent,
        FooterComponent,
        LogincommonsideComponent,
        BreadcrumComponent,
        CommonuploadComponent,
    ],
    imports: [
        CommonModule,
        MaterialModule

    ],
    exports: [
        CommonModule,
        DashboardHeaderComponent,
        CommonSidebarComponent,
        FooterComponent,
        LogincommonsideComponent,
        MaterialModule,
        BreadcrumComponent,
        CommonuploadComponent,

    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    providers: [],
})
export class SharedModule { }
