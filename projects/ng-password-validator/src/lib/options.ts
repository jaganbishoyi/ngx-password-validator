import { IStatus, NgPasswordValidatorOptions } from "./ng-password-validator.interface";

export const defaultOptions: NgPasswordValidatorOptions = {
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
    }
};

export const initializeStage: IStatus = {
    password: false,
    "include-symbol": false,
    "include-number": false,
    "include-lowercase-characters": false,
    "include-uppercase-characters": false,
};
