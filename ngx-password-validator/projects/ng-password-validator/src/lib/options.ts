import { IStatus, NgPasswordValidatorOptions } from "./ng-password-validator.interface";

export const defaultOptions: NgPasswordValidatorOptions = {
    placement: "bottom",
    "z-index": 0,
    "custom-class": "",
    shadow: true,
    theme: "basic",
    offset: 8,
    rules: {
        "password-length": 8,
        "include-symbol": true,
        "include-number": true,
        "include-lowercase-characters": true,
        "include-uppercase-characters": true,
    }
};

export const initializeStage: IStatus = {
    passwordLength: false,
    includeSymbol: false,
    includeNumber: false,
    includeLowercaseCharacters: false,
    includeUppercaseCharacters: false,
};
