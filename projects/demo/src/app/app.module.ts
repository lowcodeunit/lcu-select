import { LcuSelectModule } from '@lowcodeunit/lcu-select-common';
import { FathymSharedModule } from '@lcu/common';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LcuSelectModule,
    ReactiveFormsModule,
    FathymSharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
