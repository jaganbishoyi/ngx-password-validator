import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgPasswordValidatorModule, NgPasswordValidatorOptions } from "ng-password-validator";
import { ToastrModule } from "ngx-toastr";
// import { NgPasswordValidatorOptions } from "projects/ng-password-validator/src/lib/ng-password-validator.interface";
// import { NgPasswordValidatorModule } from "projects/ng-password-validator/src/lib/ng-password-validator.module";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { DemoComponent } from "./demo/demo.component";

export const MyDefaultOptions: NgPasswordValidatorOptions = {
    placement: "bottom",
};
@NgModule({
    declarations: [
        AppComponent,
        DemoComponent
    ],
    imports: [
        BrowserModule, ReactiveFormsModule, AppRoutingModule,
        NgPasswordValidatorModule.forRoot(MyDefaultOptions as NgPasswordValidatorOptions),
        BrowserAnimationsModule,
        ToastrModule.forRoot(
            {
                timeOut: 4000,
                preventDuplicates: true,
            }
        ),
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
