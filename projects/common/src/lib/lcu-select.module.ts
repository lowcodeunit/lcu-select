import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LcuSelectComponent } from './controls/lcu-select/lcu-select.component';

@NgModule({
  declarations: [LcuSelectComponent],
  imports: [
    CommonModule
  ],
  exports: [LcuSelectComponent],
  entryComponents: [LcuSelectComponent]
})
export class LcuSelectModule { }
