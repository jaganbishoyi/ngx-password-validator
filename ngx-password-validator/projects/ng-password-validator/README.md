# Password validator for Angular

The password validator is a pop-up window that appears when you start typing in input box. Here you can configure the password acceptance criteria, once your enter characters fullfil the requirement you will get a success message.

Help to make Password Validator better by [answering a few questions](https://forms.gle/P5KKhEsr91N85oWE9).

## Demo
[https://jaganbishoyi.github.io/ngx-password-validator/](https://jaganbishoyi.github.io/ngx-password-validator/)

## Installation

Install the npm package.

    npm i ng-password-validator

Import `NgModule`:

```ts
import { NgPasswordValidatorModule } from 'ng-password-validator';

@NgModule({
    imports: [ NgPasswordValidatorModule ]
})
```

## Usage

Options can be set in the directive tag, so they have the highest priority.

```html
<input type="text" id="password" name="password" placeholder="Password.."
    NgPasswordValidator placement="top">
```

You may pass as an object:

```html
<input type="text" id="password" name="password" placeholder="Password.."
    NgPasswordValidator [options]="myOptions">
```
Password type as 'range':
```ts
myOptions = {
    'placement': 'top',
    'password': {
        'type': "range";
        'min': 6;
        'max': 10;
    },
    'shadow': false,
    'offset': 15,
}
```
Password type as 'number':
```ts
myOptions = {
    'placement': 'top',
    'password': {
        'type': "number";
        'length': 8;
    },
    'shadow': false,
    'offset': 15,
}
```

After closing the popup window, you will get one output for password validity (true/false):

```html
<input type="text" id="password" name="password" placeholder="Password.."
    NgPasswordValidator placement="top" (valid)="isValid($event)">
```
```ts
isValid(event: boolean) {
    this.isPasswordValid = event;
}
```

## Set default values

In app.module.ts export the default options like below:
```ts
import { NgPasswordValidatorModule, NgPasswordValidatorOptions } from "ng-password-validator";

export const MyDefaultOptions: NgPasswordValidatorOptions = {
    placement: "right",
    rules: {
        "include-symbol": true,
        "include-number": true,
        "include-lowercase-characters": true,
        "include-uppercase-characters": false,
    }
};
```

And pass your parameters when importing the module:
```ts
@NgModule({
    imports: [
      NgPasswordValidatorModule.forRoot(MyDefaultOptions as NgPasswordValidatorOptions)
    ]
})
```

## Properties

| name               | type                             | default   | description                                                                     |
| ------------------ | -------------------------------- | --------- | ------------------------------------------------------------------------------- |
| placement          | "top", "bottom", "left", "right" | "bottom"  | The position of the popup window.                                               |
| z-index            | number                           | 0         | Z-index of the popup window.                                                    |
| trigger            | "focus"                          |           | Specifies how the popup window is triggered.                                    |
| popup-class        | string                           |           | Classes to be passed to the popup window.                                       |
| animation-duration | number                           | 300       | The duration controls how long the animation takes to run from start to finish. |
| theme              | "basic"                          | "basic"   | Theme of popup window background and text.                                      |
| shadow             | boolean                          | true      | Shadow of the popup window.                                                     |
| offset             | number                           | 8         | Offset the popup window relative to the item.                                   |
| width              | number                           | undefined | Width of the popup window.                                                      |
| max-width          | number                           | 390       | Maximum width of the popup window.                                              |
| pointerEvents      | "auto", "none"                   | "none"    | Defines whether or not an element reacts to pointer events.                     |
| position           | {top: number, left: number}      | undefined | The popup window coordinates relative to the browser window.                    |


## Events

When you call events, the delays that are specified in the options in the directive are taken into account.

| Event                               | Description                                                                    |
| ----------------------------------- | ------------------------------------------------------------------------------ |
| {type: "show", position: DOMRect}   | The event is called before the popup window appears.                           |
| {type: "shown", position: DOMRect}  | The event is called after the animation of the appearance of the popup window. |
| {type: "hide", position: DOMRect}   | The event is called before the popup window is hidden.                         |
| {type: "hidden", position: DOMRect} | The event is called after the animation of the popup window is hidden.         |
