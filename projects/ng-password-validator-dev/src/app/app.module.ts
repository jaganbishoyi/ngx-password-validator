import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgPasswordValidatorModule } from 'projects/ng-password-validator/src/lib/ng-password-validator.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, NgPasswordValidatorModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
