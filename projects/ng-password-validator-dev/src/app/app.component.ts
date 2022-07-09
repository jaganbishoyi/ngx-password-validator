import { Component } from '@angular/core';
import { NgPasswordValidatorOptions } from 'projects/ng-password-validator/src/lib/ng-password-validator.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'ng-password-validator-dev';
  options: NgPasswordValidatorOptions = {
    placement: 'bottom',
    type: 'inline',
    'custom-class': 'custom-class',
    rules: {
      password: {
        type: 'range',
        min: 6,
        max: 10,
      },
    },
    shadow: true,
    offset: 15,
  };

  isValid(event: boolean): void {
    console.log(event);
  }
}
