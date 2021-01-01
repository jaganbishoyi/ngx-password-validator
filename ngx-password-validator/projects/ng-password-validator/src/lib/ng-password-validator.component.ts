import {
    Component,
    ElementRef,
    EventEmitter,
    HostBinding,
    HostListener,
    Input,
    OnInit,
    Renderer2
} from "@angular/core";

import { DataService } from "./data.service";
import { IElementPosition, IRules, IStatus, NgPasswordValidatorOptions } from "./ng-password-validator.interface";
import { defaultOptions } from "./options";
@Component({
    selector: "NgPasswordValidator",
    templateUrl: "./ng-password-validator.component.html",
    host: { class: "popup" },
    styleUrls: ["./ng-password-validator.component.scss"]
})
export class NgPasswordValidatorComponent implements OnInit {
    passwordStatus = {
        "password": false,
        "include-symbol": false,
        "include-number": false,
        "include-lowercase-characters": false,
        "include-uppercase-characters": false,
    };
    isSecure = false;
    Show = false;
    events = new EventEmitter();
    passwordOptions: NgPasswordValidatorOptions = defaultOptions;

    @Input() data: any;

    @HostBinding("style.top") hostStyleTop: string;
    @HostBinding("style.left") hostStyleLeft: string;
    @HostBinding("style.z-index") hostStyleZIndex: number;
    @HostBinding("style.transition") hostStyleTransition: string;
    @HostBinding("style.width") hostStyleWidth: string;
    @HostBinding("style.max-width") hostStyleMaxWidth: string;
    @HostBinding("style.pointer-events") hostStylePointerEvents: string;
    @HostBinding("class.popup-show") hostClassShow: boolean;
    @HostBinding("class.popup-shadow") hostClassShadow: boolean;

    /**
     * Host listener transition end
     *
     * @memberof NgPasswordValidatorComponent
     */
    @HostListener("transitionend", [""])
    transitionEnd(): void {
        if (this.show) {
            this.events.emit({
                type: "shown"
            });
        }
    }

    @Input() set show(value: boolean) {
        if (value) {
            this.setPosition();
        }
        this.Show = this.hostClassShow = value;
    }

    get show(): boolean {
        return this.Show;
    }

    get placement(): string {
        return this.data.options.placement;
    }

    get element() {
        return this.data.element;
    }

    get elementPosition(): IElementPosition {
        return this.data.elementPosition;
    }

    get options(): NgPasswordValidatorOptions {
        return this.data.options;
    }

    get popupOffset(): number {
        return Number(this.data.options.offset);
    }

    get rules(): IRules {
        return { ...this.data.defaultOptions.rules, ... this.data.options.rules };
    }

    get defaultOptions(): NgPasswordValidatorOptions {
        return this.data.defaultOptions;
    }

    constructor(private elementRef: ElementRef, private renderer: Renderer2, private dataService: DataService) { }

    /**
     * Component initialization
     *
     * @memberof NgPasswordValidatorComponent
     */
    ngOnInit(): void {
        this.setCustomClass();
        this.setStyles();
        this.dataService.updatedValue.subscribe((data: IStatus) => {
            this.passwordStatus = { ... this.passwordStatus, ...data };
            for (const propName in this.passwordOptions.rules) {
                if (!this.passwordOptions.rules[propName]) {
                    delete this.passwordStatus[propName];
                }
            }
            this.isSecure = Object.values(this.passwordStatus).every((value: boolean) => value);
        });
    }

    /**
     * Set popup window position
     *
     * @returns {void}
     * @memberof NgPasswordValidatorComponent
     */
    setPosition(): void {
        if (this.setHostStyle(this.placement)) {
            this.setPlacementClass(this.placement);

            return;
        } else {
            // Is popup outside the visible area
            const placements = ["top", "right", "bottom", "left"];
            let isPlacementSet;

            for (const placement of placements) {
                if (this.setHostStyle(placement)) {
                    this.setPlacementClass(placement);
                    isPlacementSet = true;

                    return;
                }
            }

            // Set original placement
            if (!isPlacementSet) {
                this.setHostStyle(this.placement);
                this.setPlacementClass(this.placement);
            }
        }
    }

    /**
     * Set popup placement class
     *
     * @param {string} placement
     * @memberof NgPasswordValidatorComponent
     */
    setPlacementClass(placement: string): void {
        this.renderer.addClass(this.elementRef.nativeElement, "popup-" + placement);
    }

    /**
     * Set host element style
     *
     * @param {string} placement
     * @returns {boolean}
     * @memberof NgPasswordValidatorComponent
     */
    setHostStyle(placement: string): boolean {
        const isSvg = this.element instanceof SVGElement;
        const popup = this.elementRef.nativeElement;
        const isCustomPosition = !this.elementPosition.right;

        let elementHeight = isSvg ? this.element.getBoundingClientRect().height : this.element.offsetHeight;
        let elementWidth = isSvg ? this.element.getBoundingClientRect().width : this.element.offsetWidth;
        const popupHeight = popup.clientHeight;
        const popupWidth = popup.clientWidth;
        const scrollY = window.pageYOffset;

        if (isCustomPosition) {
            elementHeight = 0;
            elementWidth = 0;
        }

        let topStyle;
        let leftStyle;

        switch (placement) {
            case "top":
                topStyle = (this.elementPosition.top + scrollY) - (popupHeight + this.popupOffset);
                leftStyle = this.elementPosition.left;

                break;

            case "bottom":
                topStyle = (this.elementPosition.top + scrollY) + elementHeight + this.popupOffset;
                leftStyle = this.elementPosition.left;

                break;
            case "left":
                leftStyle = this.elementPosition.left - popupWidth - this.popupOffset;
                topStyle = (this.elementPosition.top + scrollY);

                break;

            case "right":
                leftStyle = this.elementPosition.left + elementWidth + this.popupOffset;
                topStyle = (this.elementPosition.top + scrollY);

        }

        this.hostStyleTop = topStyle + "px";
        this.hostStyleLeft = leftStyle + "px";

        return true;
    }

    /**
     * Sets Z-index
     *
     * @memberof NgPasswordValidatorComponent
     */
    setZIndex(): void {
        if (this.options["z-index"] !== 0) {
            this.hostStyleZIndex = this.options["z-index"];
        }
    }

    /**
     * Ste custom class name
     *
     * @memberof NgPasswordValidatorComponent
     */
    setCustomClass(): void {
        if (this.options["customClass"]) {
            this.options["customClass"].split(" ").forEach((className: string) => {
                this.renderer.addClass(this.elementRef.nativeElement, className);
            });
        }
    }

    /**
     * Sets the animation duration
     *
     * @memberof NgPasswordValidatorComponent
     */
    setAnimationDuration(): void {
        this.hostStyleTransition = "opacity " + this.options["animationDuration"] + "ms";
    }

    /**
     * Set popup window style
     *
     * @memberof NgPasswordValidatorComponent
     */
    setStyles(): void {
        this.setZIndex();
        this.setAnimationDuration();

        this.hostClassShadow = this.options["shadow"];
        this.hostStyleMaxWidth = this.options["maxWidth"] + "px";
        this.hostStyleWidth = this.options["width"] ? this.options["width"] + "px" : "";
    }
}
