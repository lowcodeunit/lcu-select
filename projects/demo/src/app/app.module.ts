import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AgmCoreModule } from '@agm/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LcuSelectModule } from '@lowcodeunit/lcu-select-common';
import { ReactiveFormsModule } from '@angular/forms';
import { FathymSharedModule } from '@lcu/common';

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
