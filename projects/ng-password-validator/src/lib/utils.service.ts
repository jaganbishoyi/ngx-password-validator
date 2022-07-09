import { Injectable } from '@angular/core';
import { NgPasswordValidatorOptions } from './ng-password-validator.interface';

@Injectable()
export class UtilsService {
  /**
   * Deep merge objects
   *
   * @param {NgPasswordValidatorOptions} target
   * @param {NgPasswordValidatorOptions} source
   * @returns {NgPasswordValidatorOptions}
   * @memberof UtilsService
   */
  deepMerge(
    target: NgPasswordValidatorOptions,
    source: NgPasswordValidatorOptions
  ): NgPasswordValidatorOptions {
    // Iterate through `source` properties and if an `Object` set property to merge of `target` and `source` properties
    for (const key of Object.keys(source)) {
      if (source[key] instanceof Object) {
        Object.assign(source[key], this.deepMerge(target[key], source[key]));
      }
    }

    // Join `target` and modified `source`
    Object.assign(target || {}, source);

    return target;
  }
}
