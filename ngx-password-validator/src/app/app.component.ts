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
        placement: "bottom",
        rules: {
            "include-lowercase-characters": true,
        }
    };

    /**
     * Password requirement is fulfilled or not
     *
     * @param {boolean} event
     * @memberof AppComponent
     */
    isValid(event: boolean): void {
        console.log(event);
    }
}
