import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LcuSelectModule } from '@lowcodeunit/lcu-select-common';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LcuSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
