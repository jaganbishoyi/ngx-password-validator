import { Component } from "@angular/core";
import { NgPasswordValidatorOptions } from "ng-password-validator";
@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.scss"]
})
export class AppComponent {
    title = "ngx password validator";
    myOptions: NgPasswordValidatorOptions = {
        placement: "top",
        rules: {
            "include-lowercase-characters": false
        }
    };

    isValid(event: boolean) {
        debugger
    }
}
