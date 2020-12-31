import {
    ApplicationRef,
    ComponentFactoryResolver,
    Directive,
    ElementRef,
    EmbeddedViewRef, EventEmitter, HostListener, Inject, Injector, Input, OnChanges, OnDestroy, Optional, Output, SimpleChange
} from "@angular/core";
import { Subscription } from "rxjs";

import { DataService } from "./data.service";
import { NgPasswordValidatorComponent } from "./ng-password-validator.component";
import { IElementPosition, NgPasswordValidatorOptions } from "./ng-password-validator.interface";
import { NgPasswordValidatorService } from "./ng-password-validator.service";
import { defaultOptions } from "./options";

export interface HostComponent {
    data: any;
    show: boolean;
    close: boolean;
    events: any;
}

@Directive({
    // tslint:disable-next-line: directive-selector
    selector: "[NgPasswordValidator]",
    exportAs: "NgPasswordValidator",
})

export class NgPasswordValidatorDirective implements OnDestroy, OnChanges {
    regExpForLength = /^(.){6}$/;
    regExpForOneUpper = /^(?=.*[A-Z])(.*)$/;
    regExpForOneLower = /^(?=.*[a-z])(.*)$/;
    regExpForOneDigit = /^(?=.*[0-9])(.*)$/;
    regExpForSpecialCharacters = /^(?=.*[!@#$%^&*])([a-zA-Z0-9!@#$%^&*]*)$/;

    isValid = false;
    componentRef: any;
    elementPosition: IElementPosition;
    passwordOptions: NgPasswordValidatorOptions;
    componentSubscribe: Subscription;

    @Input("options") set options(value: NgPasswordValidatorOptions) {
        if (value && defaultOptions) {
            this.passwordOptions = { ...value, ...defaultOptions };
            if (this.passwordOptions && this.passwordOptions.rules["password-length"]) {
                this.regExpForLength = new RegExp("^(.){" + this.passwordOptions.rules["password-length"] + "}$");
            }
        }
    }
    @Input("NgPasswordValidator") popup: string;
    @Input("placement") placement: string;
    @Input("z-index") zIndex: number;
    @Input("animation-duration") animationDuration: number;
    @Input("custom-class") customClass: string;
    @Input("shadow") shadow: boolean;
    @Input("theme") theme: string;
    @Input("offset") offset: number;
    @Input("width") width: number;
    @Input("max-width") maxWidth: number;
    @Input("position") position: { top: number, left: number };

    @Output() events: EventEmitter<any> = new EventEmitter<any>();
    @Output() valid: EventEmitter<boolean> = new EventEmitter();

    constructor(
        @Optional() @Inject(NgPasswordValidatorService) private initOptions,
        private elementRef: ElementRef,
        private componentFactoryResolver: ComponentFactoryResolver,
        private appRef: ApplicationRef,
        private dataService: DataService,
        private injector: Injector) {
    }

    get options() {
        return this.passwordOptions;
    }

    get isPopupDestroyed(): boolean {
        return this.componentRef && this.componentRef.hostView.destroyed;
    }

    /**
     * Get popup position
     *
     * @readonly
     * @type {(IElementPosition | { top: number, left: number })}
     * @memberof NgPasswordValidatorDirective
     */
    get popupPosition(): IElementPosition | { top: number, left: number } {
        if (this.options["position"]) {
            return this.options["position"];
        } else {
            return this.elementPosition;
        }
    }

    /**
     * Focus in input field
     *
     * @memberof NgPasswordValidatorDirective
     */
    @HostListener("focusin")
    onMouseEnter(): void {
        this.show();
    }

    /**
     * Focus out of input field
     *
     * @memberof NgPasswordValidatorDirective
     */
    @HostListener("focusout")
    onMouseLeave(): void {
        this.destroyPopup();
        this.valid.emit(this.isValid);
    }

    /**
     * Input field value
     *
     * @param {string} value
     * @memberof NgPasswordValidatorDirective
     */
    @HostListener("input", ["$event.target.value"])
    onInput(value: string): void {
        this.checkPassword(value);
    }

    /**
     * On input change
     *
     * @param {{ popup: SimpleChange }} changes
     * @memberof NgPasswordValidatorDirective
     */
    ngOnChanges(changes: { popup: SimpleChange }): void {
        const changedOptions = this.getProperties(changes);
        this.applyOptionsDefault(defaultOptions, changedOptions);
    }

    /**
     * Destroy the pop up and unsubscribe to release the memory
     *
     * @memberof NgPasswordValidatorDirective
     */
    ngOnDestroy(): void {
        this.destroyPopup();
        if (this.componentSubscribe) {
            this.componentSubscribe.unsubscribe();
        }
    }

    /**
     * Check password if valid or not
     *
     * @param {string} inputValue
     * @memberof NgPasswordValidatorDirective
     */
    checkPassword(inputValue: string): void {
        const data = {
            passwordLength: inputValue.match(this.regExpForLength) ? true : false,
            includeSymbol: inputValue.match(this.regExpForSpecialCharacters) ? true : false,
            includeNumber: inputValue.match(this.regExpForOneDigit) ? true : false,
            includeLowercaseCharacters: inputValue.match(this.regExpForOneLower) ? true : false,
            includeUppercaseCharacters: inputValue.match(this.regExpForOneUpper) ? true : false,
        };

        this.isValid = Object.values(data).every((value: boolean) => value);
        this.dataService.updateValue(data);
    }

    /**
     * Get properties
     *
     * @param {{ popup: SimpleChange }} changes
     * @returns {{ popup: any }}
     * @memberof NgPasswordValidatorDirective
     */
    getProperties(changes: { popup: SimpleChange }): { popup: any } {
        const directiveProperties: any = {};
        let customProperties: any = {};
        let allProperties: any = {};

        // tslint:disable-next-line: forin
        for (const prop in changes) {
            if (prop !== "options") {
                directiveProperties[prop] = changes[prop].currentValue;
            }
            if (prop === "options") {
                customProperties = changes[prop].currentValue;
            }
        }

        allProperties = Object.assign({}, customProperties, directiveProperties);

        return allProperties;
    }

    /**
     * Get element position
     *
     * @memberof NgPasswordValidatorDirective
     */
    getElementPosition(): void {
        this.elementPosition = this.elementRef.nativeElement.getBoundingClientRect();
    }

    /**
     * Create Popup
     *
     * @memberof NgPasswordValidatorDirective
     */
    createPopup(): void {
        this.getElementPosition();
        this.appendComponentToBody(NgPasswordValidatorComponent);
        this.showPopupElem();
    }

    /**
     * Destroy Popup
     *
     * @returns {void}
     * @memberof NgPasswordValidatorDirective
     */
    destroyPopup(): void {
        if (!this.isPopupDestroyed) {
            this.hidePopup();

            if (!this.componentRef || this.isPopupDestroyed) {
                return;
            }

            this.appRef.detachView(this.componentRef.hostView);
            this.componentRef.destroy();
            this.events.emit({
                type: "hidden",
                position: this.popupPosition
            });
        }
    }

    /**
     * Show popup window
     *
     * @memberof NgPasswordValidatorDirective
     */
    showPopupElem(): void {
        (this.componentRef.instance as HostComponent).show = true;
        this.events.emit({
            type: "show",
            position: this.popupPosition
        });
    }

    /**
     * Hide popup window
     *
     * @returns {void}
     * @memberof NgPasswordValidatorDirective
     */
    hidePopup(): void {
        if (!this.componentRef || this.isPopupDestroyed) {
            return;
        }
        (this.componentRef.instance as HostComponent).show = false;
        this.events.emit({
            type: "hide",
            position: this.popupPosition
        });
    }

    /**
     * Append created popup window to body
     *
     * @param {*} component
     * @memberof NgPasswordValidatorDirective
     */
    appendComponentToBody(component: any): void {
        this.componentRef = this.componentFactoryResolver
            .resolveComponentFactory(component)
            .create(this.injector);
        (this.componentRef.instance as HostComponent).data = {
            element: this.elementRef.nativeElement,
            elementPosition: this.popupPosition,
            options: this.options,
            defaultOptions
        };

        this.appRef.attachView(this.componentRef.hostView);
        const domElem = (this.componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
        document.body.appendChild(domElem);

        this.componentSubscribe = (this.componentRef.instance as HostComponent).events.subscribe((event: any) => {
            this.handleEvents(event);
        });
    }

    /**
     * Reset/switching back to default options
     *
     * @param {NgPasswordValidatorOptions} defaultOption
     * @param {{ popup: SimpleChange }} options
     * @memberof NgPasswordValidatorDirective
     */
    applyOptionsDefault(defaultOption: NgPasswordValidatorOptions, options: { popup: SimpleChange }): void {
        this.options = Object.assign({}, defaultOption, this.initOptions || {}, options);
    }

    /**
     * Handle events
     *
     * @param {*} event
     * @memberof NgPasswordValidatorDirective
     */
    handleEvents(event: any): void {
        if (event.type === "shown") {
            this.events.emit({
                type: "shown",
                position: this.popupPosition
            });
        }
    }

    /**
     * It creates popup window to show password requirement
     *
     * @memberof NgPasswordValidatorDirective
     */
    show(): void {
        if (!this.componentRef || this.isPopupDestroyed) {
            this.createPopup();
        } else if (!this.isPopupDestroyed) {
            this.showPopupElem();
        }
    }

    /**
     * Hide/Destroys popup windows
     *
     * @memberof NgPasswordValidatorDirective
     */
    hide(): void {
        this.destroyPopup();
    }
}
