import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
// import { NgPasswordValidatorModule, NgPasswordValidatorOptions } from "projects/ng-password-validator/src/lib/ng-password-validator.module";
import { NgPasswordValidatorModule, NgPasswordValidatorOptions } from "ng-password-validator";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";


export const MyDefaultOptions: NgPasswordValidatorOptions = {
    placement: "bottom",
    rules: {
        "password-length": 10
    }
};
@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        NgPasswordValidatorModule.forRoot(MyDefaultOptions as NgPasswordValidatorOptions)
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
