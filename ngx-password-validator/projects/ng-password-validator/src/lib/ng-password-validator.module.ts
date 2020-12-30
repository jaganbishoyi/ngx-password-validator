import { CommonModule } from "@angular/common";
import { ModuleWithProviders, NgModule } from "@angular/core";

import { DataService } from "./data.service";
import { NgPasswordValidatorComponent } from "./ng-password-validator.component";
import { NgPasswordValidatorDirective } from "./ng-password-validator.directive";
import { NgPasswordValidatorOptions } from "./ng-password-validator.interface";
import { NgPasswordValidatorService } from "./ng-password-validator.service";
@NgModule({
    declarations: [
        NgPasswordValidatorDirective,
        NgPasswordValidatorComponent,
    ],
    imports: [
        CommonModule
    ],
    providers: [DataService],
    exports: [
        NgPasswordValidatorDirective
    ],
    entryComponents: [
        NgPasswordValidatorComponent
    ]
})
export class NgPasswordValidatorModule {

    /**
     * Password validator module
     *
     * @static
     * @param {NgPasswordValidatorOptions} initOptions
     * @returns {ModuleWithProviders<NgPasswordValidatorModule>}
     * @memberof NgPasswordValidatorModule
     */
    static forRoot(initOptions: NgPasswordValidatorOptions): ModuleWithProviders<NgPasswordValidatorModule> {
        return {
            ngModule: NgPasswordValidatorModule,
            providers: [
                {
                    provide: NgPasswordValidatorService,
                    useValue: initOptions
                }
            ]
        };
    }
}
