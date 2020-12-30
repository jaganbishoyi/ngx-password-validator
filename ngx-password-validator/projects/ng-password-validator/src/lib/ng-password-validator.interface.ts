export interface NgPasswordValidatorOptions {
    "placement"?: "top" | "right" | "bottom" | "left";
    "z-index"?: number;
    "animation-duration"?: number;
    "custom-class"?: string;
    "shadow"?: boolean;
    "theme"?: string;
    "offset"?: number;
    "width"?: number;
    "max-width"?: number;
    "position"?: { top: number, left: number };
    "rules"?: IRules;
}

export interface IElementPosition {
    bottom: number;
    height: number;
    left: number;
    right: number;
    top: number;
    width: number;
    x: number;
    y: number;
}

export interface IRules {
    "password-length"?: number | boolean;
    "include-symbol"?: boolean;
    "include-number"?: boolean;
    "include-lowercase-characters"?: boolean;
    "include-uppercase-characters"?: boolean;
}

export interface IStatus {
    passwordLength: boolean;
    includeSymbol: boolean;
    includeNumber: boolean;
    includeLowercaseCharacters: boolean;
    includeUppercaseCharacters: boolean;
}
