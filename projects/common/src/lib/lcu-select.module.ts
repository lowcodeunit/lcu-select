import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './modules/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SelectComponent } from './controls/select/select.component';

@NgModule({
  declarations: [SelectComponent],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    BrowserAnimationsModule
  ],
  exports: [MaterialModule, SelectComponent],
  entryComponents: [SelectComponent]
})
export class LcuSelectModule { }
