import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  NgPasswordValidatorModule,
  NgPasswordValidatorOptions,
} from 'ng-password-validator';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { DemoComponent } from './demo/demo.component';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';

export const MyDefaultOptions: NgPasswordValidatorOptions = {
  placement: 'bottom',
};

@NgModule({
  declarations: [AppComponent, DemoComponent],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    NgPasswordValidatorModule.forRoot(
      MyDefaultOptions as NgPasswordValidatorOptions
    ),
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 4000,
      preventDuplicates: true,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
