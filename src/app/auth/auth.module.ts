import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { AuthRoutingModule } from './auth-routing.module';
import { MaterialModule } from '../material/material/material.module';
import { AuthComponent } from './auth.component';

@NgModule({
    declarations: [
        AuthComponent
    ],
    imports: [
        CommonModule,
        AuthRoutingModule,
        MaterialModule,
        SharedModule,

    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    providers: []
})
export class AuthModule { }
