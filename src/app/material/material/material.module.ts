import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSliderModule } from '@angular/material/slider';
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatIconModule,
    MatSliderModule,
    MatInputModule
  ],

  exports: [
    MatFormFieldModule,
    MatIconModule,
    MatSliderModule,
    MatInputModule
  ]
})
export class MaterialModule { }
