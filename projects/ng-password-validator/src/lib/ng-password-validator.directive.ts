import {
  ApplicationRef,
  ComponentFactoryResolver,
  Directive,
  ElementRef,
  EmbeddedViewRef,
  EventEmitter,
  HostListener,
  Inject,
  Injector,
  Input,
  OnChanges,
  OnDestroy,
  Optional,
  Output,
  SimpleChange,
} from '@angular/core';
import { Subscription } from 'rxjs';

import { DataService } from './data.service';
import { NgPasswordValidatorComponent } from './ng-password-validator.component';
import {
  HostComponent,
  IElementPosition,
  IPosition,
  NgPasswordValidatorOptions,
} from './ng-password-validator.interface';
import { NgPasswordValidatorService } from './ng-password-validator.service';
import { defaultOptions } from './options';
import { UtilsService } from './utils.service';

@Directive({
  selector: '[NgPasswordValidator]',
  exportAs: 'NgPasswordValidator',
})
export class NgPasswordValidatorDirective implements OnDestroy, OnChanges {
  regExpForLength = /^(.){8}$/;
  regExpForOneUpper = /^(?=.*[A-Z])(.*)$/;
  regExpForOneLower = /^(?=.*[a-z])(.*)$/;
  regExpForOneDigit = /^(?=.*[0-9])(.*)$/;
  regExpForSpecialCharacters = /^(?=.*[!@#$%^&*])([a-zA-Z0-9!@#$%^&*]*)$/;

  isValid = false;
  inputValue = '';
  componentRef: any;
  elementPosition: IElementPosition;
  passwordOptions: NgPasswordValidatorOptions;
  componentSubscribe: Subscription;

  @Input('NgPasswordValidator') popup: NgPasswordValidatorOptions;

  @Output() events: EventEmitter<any> = new EventEmitter<any>();
  @Output() valid: EventEmitter<boolean> = new EventEmitter();

  constructor(
    @Optional() @Inject(NgPasswordValidatorService) private initOptions,
    private elementRef: ElementRef,
    private componentFactoryResolver: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private dataService: DataService,
    private utilsService: UtilsService,
    private injector: Injector
  ) {}

  get options() {
    return this.passwordOptions;
  }

  get isPopupDestroyed(): boolean {
    return this.componentRef && this.componentRef.hostView.destroyed;
  }

  get popupPosition(): IElementPosition | IPosition {
    if (this.options['position']) {
      return this.options['position'];
    } else {
      return this.elementPosition;
    }
  }

  /**
   * Focus in input field
   *
   * @memberof NgPasswordValidatorDirective
   */
  @HostListener('focusin', ['$event.target.value'])
  onMouseEnter(value: any): void {
    this.updatePasswordOptions();
    this.show();
    this.checkPassword(value);
  }

  /**
   * Focus out of input field
   *
   * @memberof NgPasswordValidatorDirective
   */
  @HostListener('focusout')
  onMouseLeave(): void {
    // If the template type is inline, don't destroy the created template
    if (this.passwordOptions.type !== 'inline') {
      this.destroyPopup();
    }
    this.valid.emit(this.isValid);
  }

  /**
   * Input field value
   *
   * @param {string} value
   * @memberof NgPasswordValidatorDirective
   */
  @HostListener('input', ['$event.target.value'])
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
    // If the template type is 'inline' create the inline template directly
    const templateType = changes.popup.currentValue.type;
    if (templateType === 'inline') {
      this.updatePasswordOptions();
      this.show();
    }
    const changedOptions = this.getProperties(changes);
    this.applyOptionsDefault(changedOptions, defaultOptions);
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
   * Create password regex
   *
   * @memberof NgPasswordValidatorDirective
   */
  createPasswordRegex(): void {
    if (this.passwordOptions.rules.password) {
      switch (this.passwordOptions.rules['password'].type) {
        case 'number':
          this.regExpForLength = new RegExp(
            `^(.){${this.passwordOptions.rules['password'].length}}$`
          );
          break;

        case 'range':
          this.regExpForLength = new RegExp(
            `^(.){${this.passwordOptions.rules['password'].min},${this.passwordOptions.rules['password'].max}}$`
          );
      }
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
      password:
        inputValue &&
        inputValue.length &&
        inputValue.match(this.regExpForLength)
          ? true
          : false,
      'include-symbol':
        inputValue &&
        inputValue.length &&
        inputValue.match(this.regExpForSpecialCharacters)
          ? true
          : false,
      'include-number':
        inputValue &&
        inputValue.length &&
        inputValue.match(this.regExpForOneDigit)
          ? true
          : false,
      'include-lowercase-characters':
        inputValue &&
        inputValue.length &&
        inputValue.match(this.regExpForOneLower)
          ? true
          : false,
      'include-uppercase-characters':
        inputValue &&
        inputValue.length &&
        inputValue.match(this.regExpForOneUpper)
          ? true
          : false,
    };

    for (const propName in this.passwordOptions.rules) {
      if (!this.passwordOptions.rules[propName]) {
        delete data[propName];
      }
    }
    this.isValid = Object.values(data).every((value: boolean) => value);
    this.dataService.updateValue(data);
  }

  /**
   * Update password options
   *
   * @memberof NgPasswordValidatorDirective
   */
  updatePasswordOptions(): void {
    if (this.popup && defaultOptions) {
      this.passwordOptions = this.utilsService.deepMerge(
        defaultOptions,
        this.popup
      );
    } else {
      this.passwordOptions = { ...defaultOptions };
    }
    this.createPasswordRegex();
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

    for (const prop in changes) {
      if (prop !== 'options') {
        directiveProperties[prop] = changes[prop].currentValue;
      }
      if (prop === 'options') {
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
    this.elementPosition =
      this.elementRef.nativeElement.getBoundingClientRect();
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
        type: 'hidden',
        position: this.popupPosition,
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
      type: 'show',
      position: this.popupPosition,
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
      type: 'hide',
      position: this.popupPosition,
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
      defaultOptions,
    };

    this.appRef.attachView(this.componentRef.hostView);
    const domElem = (this.componentRef.hostView as EmbeddedViewRef<any>)
      .rootNodes[0] as HTMLElement;
    document.body.appendChild(domElem);

    this.componentSubscribe = (
      this.componentRef.instance as HostComponent
    ).events.subscribe((event: any) => {
      this.handleEvents(event);
    });

    if (this.options.type === 'inline') {
      this.elementRef.nativeElement.style.marginBottom =
        this.popupPosition['bottom'] + 'px';
    }
  }

  /**
   * Reset/switching back to default options
   *
   * @param {NgPasswordValidatorOptions} defaultOption
   * @param {{ popup: SimpleChange }} options
   * @memberof NgPasswordValidatorDirective
   */
  applyOptionsDefault(
    options: { popup: SimpleChange },
    defaultOption: NgPasswordValidatorOptions
  ): void {
    this.initOptions = Object.assign(
      {},
      this.initOptions || {},
      options,
      defaultOption
    );
  }

  /**
   * Handle events
   *
   * @param {*} event
   * @memberof NgPasswordValidatorDirective
   */
  handleEvents(event: any): void {
    if (event.type === 'shown') {
      this.events.emit({
        type: 'shown',
        position: this.popupPosition,
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
