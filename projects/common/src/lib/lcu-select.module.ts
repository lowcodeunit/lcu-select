import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './modules/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SelectComponent } from './controls/select/select.component';
import { MatLcuSelectComponent } from './controls/mat-lcu-select/mat-lcu-select.component';

@NgModule({
  declarations: [SelectComponent, MatLcuSelectComponent],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    BrowserAnimationsModule
  ],
  exports: [MaterialModule, SelectComponent, MatLcuSelectComponent],
  entryComponents: [SelectComponent, MatLcuSelectComponent]
})
export class LcuSelectModule { }
