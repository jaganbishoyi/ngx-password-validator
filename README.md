# Password validator for Angular
[![npm](https://img.shields.io/npm/v/ng-password-validator.svg?style=flat-square)](https://www.npmjs.com/package/ng-password-validator)
[![GitHub Contributors](https://img.shields.io/github/contributors/jaganbishoyi/ngx-password-validator.svg?style=flat-square)](https://github.com/jaganbishoyi/ngx-password-validator/graphs/contributors)
![GitHub language count](https://img.shields.io/github/languages/count/jaganbishoyi/ngx-password-validator)
![npm bundle size](https://img.shields.io/bundlephobia/min/ng-password-validator)
![GitHub repo size](https://img.shields.io/github/repo-size/jaganbishoyi/ngx-password-validator)
![npm](https://img.shields.io/npm/dt/ng-password-validator)
![NPM](https://img.shields.io/npm/l/ng-password-validator)
![GitHub last commit](https://img.shields.io/github/last-commit/jaganbishoyi/ngx-password-validator)
[![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat-square)](https://github.com/jaganbishoyi/ngx-password-validator/issues)

The password validator is a pop-up window that appears when you start typing in input box. Here you can configure the password acceptance criteria, once your enter characters fullfil the requirement you will get a success message.

Help to make Password Validator better by [answering a few questions](https://forms.gle/P5KKhEsr91N85oWE9).

## Demo
[https://jaganbishoyi.github.io/ngx-password-validator/](https://jaganbishoyi.github.io/ngx-password-validator/)

## Installation

Install the npm package.

    npm i ng-password-validator

Import in `NgModule`:

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
    [NgPasswordValidator]="options">
```
Password type as 'range':
```ts
options = {
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
options = {
    'placement': 'top',
    'password': {
        'type': "number";
        'length': 8;
    },
    'shadow': false,
    'offset': 15,
}
```

Theming( Default value is pro ):

```html
<input type="text" id="password" name="password" placeholder="Password.."
    [NgPasswordValidator]="options">
```
Theme as 'basic':
```ts
options = {
    'placement': 'top',
    'theme': 'basic'
}
```
Theme as 'pro':
```ts
options = {
    'placement': 'top',
    'theme': 'pro'
}
```

You can also change Popup header and success message:

```html
<input type="text" id="password" name="password" placeholder="Password.."
    [NgPasswordValidator]="options">
```
```ts
options = {
    'heading': 'Password Requirement',
    'successMessage': 'Wow! Password is Strong.'
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

| name               | type                             | default                                  | description                                                                     |
| ------------------ | -------------------------------- | ---------------------------------------- | ------------------------------------------------------------------------------- |
| placement          | "top", "bottom", "left", "right" | "bottom"                                 | The position of the popup window.                                               |
| z-index            | number                           | 0                                        | Z-index of the popup window.                                                    |
| trigger            | "focus"                          |                                          | Specifies how the popup window is triggered.                                    |
| popup-class        | string                           |                                          | Classes to be passed to the popup window.                                       |
| heading            | string                           | Password Policy                          | Heading of popup window.                                                        |
| successMessage     | string                           | Awesome! Password requirement fulfilled. | Success message after requirements fulfilled.                                   |
| animation-duration | number                           | 300                                      | The duration controls how long the animation takes to run from start to finish. |
| theme              | "basic"                          | "basic"                                  | Theme of popup window background and text.                                      |
| shadow             | boolean                          | true                                     | Shadow of the popup window.                                                     |
| offset             | number                           | 8                                        | Offset the popup window relative to the item.                                   |
| width              | number                           | undefined                                | Width of the popup window.                                                      |
| max-width          | number                           | 390                                      | Maximum width of the popup window.                                              |
| pointerEvents      | "auto", "none"                   | "none"                                   | Defines whether or not an element reacts to pointer events.                     |
| position           | {top: number, left: number}      | undefined                                | The popup window coordinates relative to the browser window.                    |


## Events

When you call events, the delays that are specified in the options in the directive are taken into account.

| Event                               | Description                                                                    |
| ----------------------------------- | ------------------------------------------------------------------------------ |
| {type: "show", position: DOMRect}   | The event is called before the popup window appears.                           |
| {type: "shown", position: DOMRect}  | The event is called after the animation of the appearance of the popup window. |
| {type: "hide", position: DOMRect}   | The event is called before the popup window is hidden.                         |
| {type: "hidden", position: DOMRect} | The event is called after the animation of the popup window is hidden.         |


## For any questions, suggestions, or feature requests

[Please file an issue](https://github.com/jaganbishoyi/ngx-password-validator/issues)!

## License

License under the MIT License (MIT)

Copyright (c) 2020-2021 [Jagan Mohan Bishoyi](http://jaganbishoyi.github.io/)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
