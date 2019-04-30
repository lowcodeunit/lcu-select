import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './modules/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SelectComponent } from './controls/select/select.component';
import { CustomMatFormFieldComponent } from './controls/custom-mat-form-field/custom-mat-form-field.component';

@NgModule({
  declarations: [SelectComponent, CustomMatFormFieldComponent],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    BrowserAnimationsModule
  ],
  exports: [MaterialModule, SelectComponent, CustomMatFormFieldComponent],
  entryComponents: [SelectComponent, CustomMatFormFieldComponent]
})
export class LcuSelectModule { }
