import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSliderModule } from '@angular/material/slider';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatIconModule,
    MatSliderModule,
    MatInputModule,
    MatSliderModule,
    MatDividerModule,
    MatListModule,
    MatToolbarModule
  ],

  exports: [
    MatFormFieldModule,
    MatIconModule,
    MatSliderModule,
    MatInputModule,
    MatSidenavModule,
    MatDividerModule,
    MatListModule
  ]
})
export class MaterialModule { }
