import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { AgmCoreModule } from '@agm/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LcuSelectModule } from '@lowcodeunit/lcu-select-common';
import { ReactiveFormsModule } from '@angular/forms';
import { FathymSharedModule } from '@lcu-ide/common';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserAnimationsModule,
    AppRoutingModule,
    LcuSelectModule,
    ReactiveFormsModule,
    FathymSharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
