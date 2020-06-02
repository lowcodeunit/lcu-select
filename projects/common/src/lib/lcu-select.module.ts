import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './modules/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SelectComponent } from './controls/select/select.component';
import { CustomMatFormFieldComponent } from './controls/custom-mat-form-field/custom-mat-form-field.component';

@NgModule({
  declarations: [SelectComponent, CustomMatFormFieldComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  exports: [SelectComponent, CustomMatFormFieldComponent, MaterialModule],
  entryComponents: [SelectComponent, CustomMatFormFieldComponent]
})
export class LcuSelectModule { }
