import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LcuSelectComponent } from './controls/lcu-select/lcu-select.component';
import { MaterialModule } from './modules/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [LcuSelectComponent],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    BrowserAnimationsModule
  ],
  exports: [LcuSelectComponent, MaterialModule],
  entryComponents: [LcuSelectComponent]
})
export class LcuSelectModule { }
