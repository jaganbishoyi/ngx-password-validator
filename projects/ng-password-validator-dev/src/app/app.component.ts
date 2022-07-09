import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'ng-password-validator-dev';
  options = {
    placement: 'bottom',
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
}
