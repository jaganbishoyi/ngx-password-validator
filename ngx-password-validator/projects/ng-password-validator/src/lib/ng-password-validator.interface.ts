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
    "password"?: false | IPassword;
    "include-symbol"?: boolean;
    "include-number"?: boolean;
    "include-lowercase-characters"?: boolean;
    "include-uppercase-characters"?: boolean;
}

export interface IStatus {
    "password": boolean;
    "include-symbol": boolean;
    "include-number": boolean;
    "include-lowercase-characters": boolean;
    "include-uppercase-characters": boolean;
}
export interface IPassword {
    type?: "number" | "range";
    length?: number;
    min?: number;
    max?: number;
}
