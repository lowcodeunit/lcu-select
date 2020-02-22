import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SelectComponent } from './controls/select/select.component';
import { CustomMatFormFieldComponent } from './controls/custom-mat-form-field/custom-mat-form-field.component';
import { MaterialModule } from '@lcu/common';

@NgModule({
  declarations: [SelectComponent, CustomMatFormFieldComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  exports: [SelectComponent, CustomMatFormFieldComponent, MaterialModule],
  entryComponents: [SelectComponent, CustomMatFormFieldComponent]
})
export class LcuSelectModule { }
