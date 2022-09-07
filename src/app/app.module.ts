import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ChipInputComponent } from './chip-input/chip-input.component';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    ChipInputComponent,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
