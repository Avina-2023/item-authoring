
import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommonSidebarComponent } from './common-sidebar/common-sidebar.component';
import { DashboardHeaderComponent } from './dashboard-header/dashboard-header.component';
import { AdminModule } from '../pages/admin/admin-module';
import { FooterComponent } from './footer/footer.component';
@NgModule({
    declarations: [
        DashboardHeaderComponent,
        CommonSidebarComponent,
        FooterComponent
    ],
    imports: [
        CommonModule,

    ],
    exports: [
        CommonModule,
        DashboardHeaderComponent,
        CommonSidebarComponent,
        FooterComponent

    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    providers: [],
})
export class SharedModule { }
