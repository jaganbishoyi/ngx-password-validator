import { NgPasswordValidatorOptions } from "./../../../projects/ng-password-validator/src/lib/ng-password-validator.interface";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
// import { NgPasswordValidatorOptions } from "ng-password-validator";
import { ToastrService } from "ngx-toastr";

@Component({
    selector: "app-demo",
    templateUrl: "./demo.component.html",
    styleUrls: ["./demo.component.scss"],
})
export class DemoComponent implements OnInit {
    form: FormGroup;
    inputValue: string;
    options: NgPasswordValidatorOptions = {
        placement: "bottom",
        "custom-class": "custom-class",
        "animation-duration": 500,
    };

    defaultOptions = {
        placement: "bottom",
        "z-index": 0,
        "custom-class": "custom-class",
        shadow: true,
        theme: "pro",
        offset: 8,
        heading: "Password Policy",
        successMessage: "Awesome! Password requirement fulfilled.",
        rules: {
            password: {
                type: "range",
                length: 8,
                min: 6,
                max: 10,
            },
            "include-symbol": true,
            "include-number": true,
            "include-lowercase-characters": true,
            "include-uppercase-characters": true,
        },
    };

    ngOnInit(): void {
        this.formInIt();
    }

    constructor(
        private formBuilder: FormBuilder,
        private toastr: ToastrService
    ) {}

    formInIt(): void {
        this.form = this.formBuilder.group({
            theme: ["pro"],
            placement: ["bottom"],
            shadow: [true],
            "custom-class": ["custom-class"],
            "z-index": [""],
            "animation-duration": [""],
            offset: ["10"],
            width: [""],
            "max-width": [""],
            top: [""],
            left: [""],
            password: [true],
            "include-uppercase-characters": [true],
            "include-lowercase-characters": [true],
            "include-symbol": [true],
            "include-number": [true],
            type: ["range"],
            length: [""],
            min: ["6"],
            max: ["10"],
            heading: [""],
            successMessage: [""],
        });

        this.formOnChange();
    }

    /**
     * Capture form value change and customize popup
     *
     * @memberof DemoComponent
     */
    formOnChange(): void {
        this.form.valueChanges.subscribe((value: any) => {
            this.options["rules"] = {
                "include-lowercase-characters":
                    value["include-lowercase-characters"],
                "include-uppercase-characters":
                    value["include-uppercase-characters"],
                "include-symbol": value["include-symbol"],
                "include-number": value["include-number"],
                password: value.password
                    ? {
                          type: value.type,
                          length: value.length,
                          min: value.min,
                          max: value.max,
                      }
                    : false,
            };

            this.updateOptions({ ...value });
        });

        this.form.get("type").valueChanges.subscribe((type: string) => {
            switch (type) {
                case "range":
                    this.form.patchValue({
                        length: "",
                        min: "6",
                        max: "10",
                    });
                    break;
                case "number":
                    this.form.patchValue({
                        length: "8",
                        min: "",
                        max: "",
                    });
            }
        });

        this.form.get("top").valueChanges.subscribe((top: string) => {
            this.options["position"] = {
                top: +top,
                left: this.form.get("left").value
                    ? +this.form.get("left").value
                    : 0,
            };
        });

        this.form.get("left").valueChanges.subscribe((left: string) => {
            this.options["position"] = {
                left: +left,
                top: this.form.get("top").value
                    ? +this.form.get("top").value
                    : 0,
            };
        });
    }

    updateOptions(value: any): void {
        delete value.top;
        delete value.left;
        delete value["include-uppercase-characters"];
        delete value["include-lowercase-characters"];
        delete value["include-symbol"];
        delete value["include-number"];
        delete value.password;
        delete value.type;
        delete value.length;
        delete value.min;
        delete value.max;

        this.options = { ...this.options, ...value };
        this.applyDefault(this.options);
    }

    onInput(event: any): void {
        this.inputValue = event.target.value;
    }

    applyDefault(obj) {
        for (let propName in obj) {
            if (obj[propName] === "") {
                this.options[propName] = this.defaultOptions[propName];
            }
        }
    }

    /**
     * Password requirement is fulfilled or not
     *
     * @param {boolean} event
     * @memberof DemoComponent
     */
    isValid(event: boolean): void {
        if (this.inputValue && this.inputValue.length) {
            if (event) {
                this.toastr.success("Password is Valid.", "Successful!");
            } else {
                this.toastr.error("Password is invalid.", "Error!");
            }
        }
    }
}
