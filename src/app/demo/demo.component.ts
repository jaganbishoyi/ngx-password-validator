import { Component, OnInit } from "@angular/core";
import { NgPasswordValidatorOptions } from "ng-password-validator";

@Component({
    selector: "app-demo",
    templateUrl: "./demo.component.html",
    styleUrls: ["./demo.component.scss"]
})
export class DemoComponent implements OnInit {

    myOptions: NgPasswordValidatorOptions = {
        placement: "bottom",
        theme: "pro"
    };

    ngOnInit(): void {
    }

    /**
     * Password requirement is fulfilled or not
     *
     * @param {boolean} event
     * @memberof DemoComponent
     */
    isValid(event: boolean): void {
        console.log(event);
    }

}
