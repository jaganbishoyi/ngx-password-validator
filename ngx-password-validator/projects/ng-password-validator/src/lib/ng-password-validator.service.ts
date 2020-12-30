
import { InjectionToken } from "@angular/core";

import { NgPasswordValidatorOptions } from "./ng-password-validator.interface";

/**
 * This is not a real service, but it looks like it from the outside.
 * It's just an InjectionToken used to import the config (initOptions) object, provided from the outside
 */
export const NgPasswordValidatorService = new InjectionToken<NgPasswordValidatorOptions>("NgPasswordValidatorOptions");
